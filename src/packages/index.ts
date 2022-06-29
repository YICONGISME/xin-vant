import Vue from 'vue';
import XinVtButton from "./xin-vt-button/index";

const components = [
    XinVtButton
];

//组件统一加上install方法
components.forEach(c => {
    //@ts-ignore
    c.install = function (vue: typeof Vue) {
        //@ts-ignore
        vue.component(c.options && c.options.name || c.name, c);
    };
});


// cdn 引入，install全部组件
const install = (vue: typeof Vue) => {
    components.forEach(component => {
        //@ts-ignore
        vue.component(component.options && component.options.name || component.name , component);
    });

    // vue.prototype.$xinMessage = XinMessage;
};

if (typeof window !== 'undefined' && window.Vue && !process.env.BUILD_TYPE) {
    install(window.Vue);
}

export {
    install,
    XinVtButton
};
//@ts-ignore
