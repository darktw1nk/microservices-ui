// @ts-ignore
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

export default class NotificationBuilder {

    static successNotification(title:string,message:string){
        store.addNotification({
            title: title,
            message: message,
            type: "success",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
    }

    static errorNotification(title:string,message:string){
        store.addNotification({
            title: title,
            message: message,
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
    }

}