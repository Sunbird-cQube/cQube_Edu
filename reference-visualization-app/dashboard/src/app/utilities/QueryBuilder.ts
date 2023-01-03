

export const buildQuery = (query: string, levels: any, filters: any = [], startDate: any, endDate: any, compareDateRange: any, key: any) => {
    let level = "state";
    let newQuery = "";

    if (filters && filters.length > 0) {
        filters = filters.filter(filter => {
            if (filter.value && filter.actions && filter.actions.level) {
                level = filter.actions.level
            }

            return filter.value
        });
        newQuery = getCubeNameFromSelFilter(filters, startDate, endDate, compareDateRange, key);
    }

    return newQuery !== "" ? newQuery : query;
}

const getCubeNameFromSelFilter = (filters, startDate, endDate, compareDateRange, key) => {
    let newQuery = "";

    if (filters.length > 0) {
        filters.forEach(({ actions: { level, query } }, index) => {
            if (level && level !== '') {
                newQuery = parseQuery(filters, index, startDate, endDate, compareDateRange, key);
            }
        });
    }

    return newQuery;
}

function parseQuery(filters, index, startDate, endDate, compareDateRange, key): string {
    const filter = filters[index];
    let query;
    if (key.toLowerCase().includes('comparison')) {
        let endDate = new Date();
        let days = endDate.getDate() - compareDateRange;
        let startDate = new Date();
        startDate.setDate(days)
        console.log(startDate.toISOString().split('T')[0], ' - ', endDate.toISOString().split('T')[0])
        query = parseTimeSeriesQuery(filter?.timeSeriesQueries[key], startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0])
        console.log(query)
    }
    else if (startDate !== undefined && endDate !== undefined && Object.keys(filter?.timeSeriesQueries).length > 0) {
        query = parseTimeSeriesQuery(filter?.timeSeriesQueries[key], startDate, endDate)
    }
    else {
        let { queries } = filter.actions;
        query = queries[key]
    }
    let startIndex = query.indexOf('{');
    let endIndex = query.indexOf('}');

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

            startIndex = query.indexOf('{');
            endIndex = query.indexOf('}');
        }
    }

    return query;
}

export function parseTimeSeriesQuery(query, startDate, endDate): string {
    let startIndex = query.indexOf('{');
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
