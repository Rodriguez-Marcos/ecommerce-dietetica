import Address from "../models/Address"



export async function getAddress(req, res) {
    try {
        let addresses = await Address.findAll()
        return res.status(200).send(addresses)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}