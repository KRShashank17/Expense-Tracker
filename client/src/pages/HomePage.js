import React , {useEffect, useState} from 'react';
import {Form, Input, Modal, Select, Table, message , DatePicker} from 'antd'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'
import {AreaChartOutlined, UnorderedListOutlined , EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Analytics from '../components/Analytics';

const {RangePicker} = DatePicker;

const HomePage = () => {
  const [showModal , setShowModal] = useState(false);
  const [loading , setLoading] = useState(false);
  const [allTransaction , setAllTransaction] = useState([]);   // empty array
  const [frequency , setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type , setType] = useState("all");
  const [viewDate , setViewData] = useState('table');
  const [editable , setEditable] = useState(false);

  
  const submitHandler = async(values)=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);

      if (editable){
        await axios.post('/api/v1/transactions/edit-transaction' , 
        {
          payload : {
            ...values , 
            userId : user._id
          },
          transactionId : editable._id
        });
        setLoading(false);
        message.success("Transaction Updated Successfully")
      }else{
        await axios.post('/api/v1/transactions/add-transaction' , 
        {...values , userid : user._id});
        setLoading(false);
        message.success("Transaction Added Successfully")
      }

      setShowModal(false);
      setEditable(false);

    } catch (error) {
      setLoading(false);
      message.error("Failed to Add Transaction");
    }
  }

  const deleteHandler = async(record) => {
    try {
      setLoading(true);
      await axios.post('/api/v1/transactions/delete-transaction', {transactionId : record._id});
      setLoading(false);
      message.success("Transaction Deleted Successfully");
    }catch(error){
      setLoading(false);
      console.log(error);
      message.error('Failed to Delete')
    }
  }

  // Table data
  const columns = [
    {
      title : "Date",
      dataIndex : "date",
      render : (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },
    {
      title : "Amount",
      dataIndex : "amount",
    },
    {
      title : "Type",
      dataIndex : "type",
    },
    {
      title : "Category",
      dataIndex : "category",
    },
    {
      title : "Description",
      dataIndex : "description",
    },
    {
      title : "Reference",
      dataIndex : "reference",
    },
    {
      title : "Actions",
      render : (text , record) => (
        <div>
          <EditOutlined onClick = {()=>{
            setEditable(record);
            setShowModal(true);
          }}/>
          <DeleteOutlined className = "mx-2" 
          onClick = {()=> {deleteHandler(record)}}/>
        </div>
      )
    }
  ];

  useEffect( ()=>{
    const getAllTransactions = async() => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/api/v1/transactions/get-transaction', 
        {userid : user._id , 
          frequency ,
          selectedDate ,
          type
        });
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
        message.error("Failed to Fetch Transaction");
      }
    }

    getAllTransactions();
  } , [frequency , selectedDate , type]);

  return (
    <Layout >
      {loading && <Spinner />}
        <div className="filters">
          <div >
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values)=>setFrequency(values)}>
              <Select.Option value='7'>Last 1 Week</Select.Option>
              <Select.Option value='30'>Last 1 Month</Select.Option>
              <Select.Option value='365'>Last 1 Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>

            {frequency === 'custom' && 
            <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)} /> }
          </div>

          <div >
            <h6>Select Type</h6>
            <Select value={type} onChange={(values)=>setType(values)}>
              <Select.Option value='all'>_  _ALL_  _</Select.Option>
              <Select.Option value='income'>INCOME</Select.Option>
              <Select.Option value='expense'>EXPENSE</Select.Option>
            </Select>

            {frequency === 'custom' && 
            <RangePicker value={selectedDate} onChange={(values)=> setSelectedDate(values)} /> }
          </div>

          <div className="switch-icons">
            <UnorderedListOutlined className={`mx-2  ${viewDate === 'table' ? 'active-icon' : 'inactive-icon'}`} 
            onClick={()=> setViewData('table')}/>

            <AreaChartOutlined className={`mx-2  ${viewDate === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
            onClick={()=> setViewData('analytics')}/>
          </div>

          <div >
            <button className='btn btn-primary' 
            onClick={()=>setShowModal(true)}>Add New</button>
          </div>

        </div>
        <div className="content">
            {viewDate === 'table' ?
              <Table  columns={columns} dataSource={allTransaction}/>
            : <Analytics allTransaction = {allTransaction} />         // passing allTrans to Anlytics file
            }
        </div>

        <Modal 
        title= {editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={()=>setShowModal(false)}
        footer={null}
        >
            <Form layout='vertical' onFinish={submitHandler} 
              initialValues={editable}>
              <Form.Item name="amount" label="Amount">
                <Input type='text'/>
              </Form.Item>
              <Form.Item name="type" label="Type">
                <Select >
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="category" label="Category">
              <Select >
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="fee">Fee</Select.Option>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="bill">Bill</Select.Option>
                  <Select.Option value="rent">Rent</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="petrol">Petrol</Select.Option>
                  <Select.Option value="others">Others</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input type='text'/>
              </Form.Item>
              <Form.Item name="reference" label="Reference">
                <Input type='text'/>
              </Form.Item>
              <Form.Item name="date" label="Date">
                <Input type='date'/>
              </Form.Item>

              <div className="d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">SAVE</button>
              </div>

            </Form>
        </Modal>
    </Layout>
  )
}

export default HomePage