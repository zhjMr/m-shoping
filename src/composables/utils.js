import { ElNotification } from 'element-plus'
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

