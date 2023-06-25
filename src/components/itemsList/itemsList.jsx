import { useState } from "react";
import { List } from 'antd';
import { useEffect } from "react";

export const ItemsList = ({ data, renderItem, title, checkedName }) => {
    const [pageSize, setPageSize] = useState(10)
    const [checkedItems, setCheckedItems] = useState({})
    const showButtonsAction = Object.values(checkedItems).some(value => value === true);

    const onChange = (e, itemId) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: e.target.checked
        })
    };

    useEffect(() => {
        const checkedItemsFromStorage = JSON.parse(localStorage.getItem(checkedName))
        if (checkedItemsFromStorage) {
            setCheckedItems(checkedItemsFromStorage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(checkedName, JSON.stringify(checkedItems))
    }, [checkedItems, checkedName])

    return (
        <>
            <List
                header={<h1 style={{ fontSize: '36px', textAlign: 'center' }}>{title}</h1>}
                itemLayout="vertical"
                size="smal"
                pagination={{
                    pageSize: pageSize,
                    showSizeChanger: true,
                    onShowSizeChange: (current, size) => setPageSize(size),
                    pageSizeOptions: ["10", "20", "50", "100"]
                }}
                dataSource={data}
                renderItem={(item) => renderItem(item, checkedItems, onChange)}
            />
            {/* {showButtonsAction &&
                // <ButtonsAction
                //     checkedItems={checkedItems}
                //     setCheckedItems={setCheckedItems}
                // />
            } */}
        </>
    )
}