/**
 * 
 */
((global) => {
    class Query {
        constructor(query) {
            if(typeof query === 'string') {
                this.$ = this.query(query);
            } else {
                this.$ = query;
            }
        }
        // document查询元素
        query(query) {
            let elements = document.querySelectorAll(query);
            if(elements.length === 0) {
                throw new Error('elements not found');
            } else if (elements.length === 1) {
                elements = elements[0];
            }
            return elements;
        }
    }
    global.$ = (query) => {
        return (new Query(query));
    };
})(window);