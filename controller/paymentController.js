
const getPayMent = (req, res) => {
    
    return res.status(200).json({
        status: 'OK',
        data: process.env.CLIENT_ID,
    })
}

module.exports = { getPayMent }; 