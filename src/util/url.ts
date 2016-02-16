import _ from 'lodash';

export function constructLocalUrl(stateName: string, query: Object) {
    const flattenedQuery = encodeQuery(query);
    return `#/${stateName}?${flattenedQuery}`;
}

export function constructUrl(baseUrl: string, query: Object) {
    const flattenedQuery = encodeQuery(query);
    return `${baseUrl}?${flattenedQuery}`;
}

function encodeQuery(query: Object, separator: string = '=', keyDelimiter: string = ''): string {
    return _.reduce(query || {}, (memo, value, key) => {
        const encodedKey = encodeURI(key);
        const encodedValue = processValue(value);
        memo.push(`${keyDelimiter}${encodedKey}${keyDelimiter}${separator }${encodedValue }`);
        return memo;
    }, []).join('&');

    function processValue(value: any) {
        return _.isPlainObject(value) ? (() => {
            const query = encodeQuery(value, ':', '"');
            return `{${query}}`;
        })() : encodeURI(value);
    }
}
export {encodeQuery};

export function flattenQuery(query: Object) {
    return _.reduce(query, (memo, a, b) => {
        return memo.concat([b, a.toString()]);
    }, []);
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