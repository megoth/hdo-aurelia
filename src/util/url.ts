import _ from 'lodash';

export function constructStateUrl(stateName: string, query: Object) {
  const flattenedQuery = flattenQuery(query);
  return `#${stateName}?${flattenedQuery}`;
}

export function constructUrl(baseUrl: string, query: Object) {
    const flattenedQuery = flattenQuery(query);
    return `${baseUrl}?${flattenedQuery}`;
}

export function flattenQuery(query: Object): string {
    return _.reduce(query || {}, (memo, value, key) => {
        memo.push(`${key}=${value}`);
        return memo;
    }, []).join('&');
}