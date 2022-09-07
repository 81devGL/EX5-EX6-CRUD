import { useState } from 'react';
import { Icon, Timeline } from 'rsuite';

function TimeLine(props) {
    const [open, setOpen] = useState(false);
    const [number, setNumber] = useState(6);
    const { timeline } = props;
    const data = [...timeline].reverse().filter((v, i) => {
        const start = 0;
        const end = number;
        return i >= start && i < end;
    });
    return (
        <>
            <i
                onClick={() => {
                    setOpen(!open);
                }}
                className="fa-solid fa-bell bell--header"
            ></i>

            {open && (
                <div className="wrapper--timeline">
                    <span className="title--timeline frontBold blue">Thông báo</span>
                    <div className="timeline">
                        <div className="content--timeline">
                            <Timeline>
                                {data.map((item) => {
                                    return (
                                        <Timeline.Item className="frontF" key={item.id}>
                                            <span className="frontXs">{item.time}</span>
                                            <span> {item.des}</span>
                                        </Timeline.Item>
                                    );
                                })}
                            </Timeline>
                        </div>
                        <div className="affter--timeline"></div>
                    </div>
                    <div className="wrapper--icon--timeline">
                        <Icon
                            size="2x"
                            icon="angle-double-down"
                            onClick={() => {
                                setNumber(number + 7);
                            }}
                            className="frontXs blue"
                        ></Icon>
                        <Icon
                            size="1x"
                            icon="angle-double-up"
                            onClick={() => {
                                if (number > 6) {
                                    setNumber(6);
                                } else if (number <= 6) {
                                    setOpen(false);
                                }
                            }}
                            className="frontXs red"
                        ></Icon>
                    </div>
                </div>
            )}
        </>
    );
}

export default TimeLine;
