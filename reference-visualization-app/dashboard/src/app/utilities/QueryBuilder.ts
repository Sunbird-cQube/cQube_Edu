export const buildQuery = (query: string, levels: any, filters: any = []) => {
    let level = "district";
    let newQuery = "";

    if (filters && filters.length > 0) {
        filters = filters.filter(filter => {
            if (filter.value && filter.actions && filter.actions.level) {
                level = filter.actions.level
            }

            return filter.value
        });
        newQuery = getCubeNameFromSelFilter(filters);
    }

    return newQuery !== "" ? newQuery : query;
}

const getCubeNameFromSelFilter = (filters) => {
    let newQuery = "";

    if (filters.length > 0) {
        filters.forEach(({ actions: { level, query } }, index) => {
            if (level && level !== '') {
                newQuery = parseQuery(filters, index);
            }
        });
    }

    return newQuery;
}

function parseQuery(filters, index): string {
    const filter = filters[index];
    let { query } = filter.actions;
    let startIndex = query.indexOf('{');
    let endIndex = query.indexOf('}');
    
    if (query && startIndex > -1) {
      while (startIndex > -1) {
        let propertyName = query.substring(startIndex + 1, endIndex);
        if (filter.value) {
          let re = new RegExp(`{${propertyName}}`, "g");
          query = query.replace(re, filter.value);
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
