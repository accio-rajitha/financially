import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";

function AddExpenseModal({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish,
}) { 
    const [form] = Form.useForm();
    return (
        <Modal 
            style={{ fontWeight: 600 }}
            title="Add Expense"
            visible={isExpenseModalVisible}
            onCancel={handleExpenseCancel}
            footer={null}
        >
            <Form 
                form={form}
                layout='vertical'
                onFinish={(values) => {
                    onFinish(values, "expense");
                    form.resetFields();
                }}
            >
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the transaction!"
                        },
                    ]}
                >
                    <Input type="text" className='custom-input' />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the expense amount!"
                        },
                    ]}
                >
                    <Input type="number" className='custom-input' />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please select the expense date!"
                        },
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                            required: true,
                            message: "Please select a tag!"
                        },
                    ]}
                >
                    <Select className='custom-input'>
                        <Select.Option value="groceries">Groceries</Select.Option>
                        <Select.Option value="rent">Rent</Select.Option>
                        <Select.Option value="utilities">Utilities</Select.Option>
                        <Select.Option value="transportation">Transportation</Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value="health">Health</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        {/* Add more options as needed */}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Expense
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddExpenseModal;
