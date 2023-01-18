

export const buildQuery = (query: string, defaultLevel: any = undefined, levels: any, filters: any = [], startDate: any, endDate: any, key: any, compareDateRange: any = undefined) => {
    let level = "state";
    let newQuery = "";

    if (filters && filters.length > 0) {
        filters = filters.filter(filter => {
            if (filter.value && filter.actions && filter.actions.level) {
                level = filter.actions.level
            }

            return filter.value
        });
        newQuery = getCubeNameFromSelFilter(filters, levels, startDate, endDate, compareDateRange, key);
    }
    let selectedLevel;
    if (levels && levels.length > 0) {
        levels.forEach((level: any) => {
            selectedLevel = level.selected ? level.value : selectedLevel
        })
    }
    if (selectedLevel !== undefined) {
        query = parseLevelQuery(query, selectedLevel, levels)
    }
    else {
        query = parseLevelQuery(query, defaultLevel, levels)
    }

    return newQuery !== "" ? newQuery : query;
}

const getCubeNameFromSelFilter = (filters, levels, startDate, endDate, compareDateRange, key) => {
    let newQuery = "";

    if (filters.length > 0) {
        filters.forEach(({ actions: { level, query } }, index) => {
            if (level && level !== '') {
                newQuery = parseQuery(filters, levels, index, startDate, endDate, compareDateRange, key);
            }
        });
    }

    return newQuery;
}

function parseQuery(filters, levels, index, startDate, endDate, compareDateRange, key): string {
    const filter = filters[index];
    let query;
    if (compareDateRange && key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        query = parseTimeSeriesQuery(filter?.timeSeriesQueries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
    }
    else if (startDate !== undefined && endDate !== undefined && Object.keys(filter?.timeSeriesQueries).length > 0) {
        query = parseTimeSeriesQuery(filter?.timeSeriesQueries[key], startDate, endDate)
    }
    else {
        let { queries } = filter.actions;
        query = queries[key]
    }
    let selectedLevel;
    let { level } = filter.actions;
    if (levels && levels.length > 0) {
        levels.forEach((level: any) => {
            selectedLevel = level.selected ? level.value : selectedLevel
        })
    }
    if (selectedLevel !== undefined) {
        query = parseLevelQuery(query, selectedLevel, levels)
    }
    else {
        query = parseLevelQuery(query, level, levels)
    }

    let startIndex = query?.indexOf('{');
    let endIndex = query?.indexOf('}');

    if (query && startIndex > -1) {
        while (startIndex > -1) {
            let propertyName = query.substring(startIndex + 1, endIndex);
            if (filter.value) {
                let re = new RegExp(`{${propertyName}}`, "g");
                query = query.replace(re, '\'' + filter.value + '\'');
            } else {
                query = null;
                break;
            }

            startIndex = query?.indexOf('{');
            endIndex = query?.indexOf('}');
        }
    }

    return query;
}

export function parseTimeSeriesQuery(query, startDate, endDate): string {
    let startIndex = query?.indexOf('{');
    if (query && startIndex > -1) {
        if (startDate && endDate) {
            let minDateRE = new RegExp(`{startDate}`, "g");
            let maxDateRE = new RegExp(`{endDate}`, "g");
            query = query.replace(minDateRE, '\'' + startDate + '\'');
            query = query.replace(maxDateRE, '\'' + endDate + '\'');
        }
        else {
            query = null;
        }
    }
    return query;
}

function parseLevelQuery(query, selectedLevel, levels): string {
    let newQuery = query;
    let startIndex = query?.indexOf('{');

    if (newQuery && startIndex > -1 && levels && selectedLevel) {
        if (selectedLevel) {
            newQuery = addMasterProps(newQuery, selectedLevel, levels)
            let level = new RegExp(`{level}`, "g");
            newQuery = newQuery.replace(level, selectedLevel);
        }
        else {
            newQuery = null;
        }
    }

    return newQuery
}

function addMasterProps(query: string, selectedLevel: any, levelConfig: any): string {
    let newQuery = query;
    let levelInfo = levelConfig.find((level: any) => {
        return level.value == selectedLevel
    })
    let { actions } = levelInfo ?? {};
    let { drilldown } = actions ?? {};
    if (drilldown && drilldown.length > 0) {
        let masterPropsString = '';
        let queryArray = newQuery.split('');
        let temp: any = newQuery.match(/ingestion.dimensions as [a-zA-z0-9]+ /) ? newQuery.match(/ingestion.dimensions as [a-zA-z0-9]+ /)[0] : undefined;
        let dimensionAlias = temp?.replace('ingestion.dimensions as ', '').trim();

        drilldown.forEach((prop: any) => {
            masterPropsString += (dimensionAlias + '.' + prop + ', ')
        });
        queryArray.splice(7, 0, masterPropsString)
        masterPropsString = masterPropsString.slice(0, -2)
        queryArray.splice(newQuery.length + 1, 0, ', ' + masterPropsString )
        newQuery = queryArray.join('');
    }
    return newQuery
}

