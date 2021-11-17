const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    let {message} = req.body
    console.log(message.length);
})

let arr = ''

let welcome = {message : 'Welcome to Delivery Service 😎' + '\n' + 'This helps you track your active deliveries 🛒'+ '\n' + 'Kindly Enter the Order ID 😊'}

app.post('/get_delivery_order', async (req, res) => {
    try {
        let { message } = req.body
        if(message == '1'){
            let order_id = arr
                let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', {order_id})
                let scan_msg = response.data.scan_message
                let scan_link = response.data.scan_link
                let resp = {
                    status: true,
                    message: (`To confirm customer has recieved the order, ` + scan_msg + ' ' + 'click the link below to scan the qr code') +
                    scan_link
                }
                res.send(resp)
        }
        if(message =='2'){
            res.send({message: 'Edit'})
        }
        if (message == 'delivery') {
            res.status(200).json(welcome)
        }
        if(message.length === 15){
            let order_id = message
             arr = message
            let response = await axios.post('https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_delivery_order', { order_id })
            if(response.data.status == true){
                let a = response.data.order
                let phone = a.phone_no
                let total_amount = a.total_price.total_amount
                let msg = {
                    status: true,
                    message: '🛒: Finally create your Customer"s order:' + '\n' + '==============='+ '\n' + '☎️ ' +phone + '\n' + '===============' + '\n' + '💵 ' + total_amount + '\n'+'===============' + '\n' + 'Type 👇🏿' + '\n' + '*[1]* To Confirm' + '\n ' + '*[2]* To Edit' + ' \n' + '*[3]* To Cancel' + '\n' + '*[m]* main menu'
                }
                res.json(msg)
            }
            else{
                res.send(response.data)
            }
        }
        if(message !== "delivery" && message !=='1' && message !== '2' && message.length !== 15){
            res.send({message: 'Wrong input ☹️, Please check and Try again'})
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
    console.log('Server connected success to ' + PORT);
})