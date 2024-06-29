export const groupObjectArray = (items, groupBy ) =>
    items.reduce((acc, item) => {
        acc[item[groupBy]] = acc[item[groupBy]] ?? [];
        acc[item[groupBy]].push(item);
        return acc;
    }, {});