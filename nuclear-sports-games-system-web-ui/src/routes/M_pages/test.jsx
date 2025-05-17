import { Notification, Button } from '@douyinfe/semi-ui';

export default function test() {
    return <Button
        onClick={() =>
            Notification.open({
                title: 'Hi, Bytedance',
                content: 'ies dance dance dance',
                duration: 3,
            })
        }
    >
        Display Notification
    </Button>
}
