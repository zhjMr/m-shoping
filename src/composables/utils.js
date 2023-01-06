import { ElNotification } from 'element-plus'
import NProgress from 'nprogress'
//通知提示
export const taost = (message, type = 'success', dangerouslyUseHTMLString = false) => {
    ElNotification({
        message,
        type,
        duration: 1500,
        dangerouslyUseHTMLString,
    })
}

//消息弹出框
export const showModel = (content = '提示内容', type = 'warning', title = '') => {
    ElMessageBox.confirm(
        content,
        title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type,
    }
    )
}

//开启全屏loading
export const showFullloading = () => {
    NProgress.start();
}

//关闭全屏loadibng
export const hideFullloading = () => {
    NProgress.done();
}


