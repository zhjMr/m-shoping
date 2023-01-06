import { ElNotification } from 'element-plus'

export const taost = (message, type = 'success', dangerouslyUseHTMLString = false) => {
    ElNotification({
        message,
        type,
        duration: 1500,
        dangerouslyUseHTMLString,
    })
}