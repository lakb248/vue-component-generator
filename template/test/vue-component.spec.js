/* global describe, it, expect */
import Vue from 'vue';
import ${bigName} from '../src/${name}.vue';

describe('${name}.vue', () => {
    it('should have correct text', () => {
        expect(${bigName}.data().text).toBe('Hello ${bigName}');
    });

    it('should render correct text', () => {
        const vm = new Vue({
            template: '<div><${name}></${name}></div>',
            components: {
                '${name}': ${bigName}
            }
        }).$mount();
        expect(vm.$el.querySelector('h2').textContent)
            .toBe('Hello ${bigName}');
    });
});
