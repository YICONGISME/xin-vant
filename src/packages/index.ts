import Vue from 'vue';
import {HttpClient} from "./xin-vt-http-client/http-client";

import XinVtDynamicForm from "./xin-vt-dynamic-form/index";
import XinVtFileUploader from "./xin-vt-file-uploader/index";
import XinVtFilePreview from "./xin-vt-file-preview/index";
import XinVtFileList from "./xin-vt-file-list/index";
import XinVtImgUploader from "./xin-vt-img-uploader/index";

const components = [
    XinVtDynamicForm,
    XinVtFileUploader,
    XinVtFilePreview,
    XinVtFileList,
    XinVtImgUploader,
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
    HttpClient,
    XinVtDynamicForm,
    XinVtFileUploader,
    XinVtFilePreview,
    XinVtFileList,
    XinVtImgUploader,
};
//@ts-ignore
