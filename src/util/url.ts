import _ from 'lodash';

export function constructLocalUrl(stateName: string, query: Object) {
    const flattenedQuery = flattenQuery(query);
    return `#/${stateName}?${flattenedQuery}`;
}

export function constructUrl(baseUrl: string, query: Object) {
    const flattenedQuery = flattenQuery(query);
    return `${baseUrl}?${flattenedQuery}`;
}

export function parseQuery(newQuery: Object, oldQuery: Object) {
    var query = _.assignIn({}, oldQuery, newQuery);
    _
        .reduce(query, (memo, value, key) => {
            if (value === '') {
                memo.push(key);
            }
            return memo;
        }, [])
        .forEach(key => {
            delete query[key];
        });
    return query;
}

function flattenQuery(query: Object, separator: string = '=', keyDelimiter: string = ''): string {
    return _.reduce(query || {}, (memo, value, key) => {
        const encodedKey = encodeURI(key);
        const encodedValue = processValue(value);
        memo.push(`${keyDelimiter}${encodedKey}${keyDelimiter}${separator }${encodedValue }`);
        return memo;
    }, []).join('&');

    function processValue(value: any) {
        return _.isPlainObject(value) ? (() => {
            const query = flattenQuery(value, ':', '"');
            return `{${query}}`;
        })() : encodeURI(value);
    }
}
export {flattenQuery};