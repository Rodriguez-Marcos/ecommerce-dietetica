import Address from "../models/Address"

export async function addAddress(req, res) {
    const { calle, altura, barrio, otros, codigo, numero } = req.body
    const id_client = req.id

    try {
        let newAddress = await Address.create({
            calle: calle,
            altura: parseInt(altura),
            barrio: barrio,
            otros: otros,
            codigo: codigo,
            numero: parseInt(numero),
            id_client: id_client
        })

        if (newAddress) {
            return res.status(200).json({
                message: 'Address added successfully',
                data: newAddress

            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}

export async function getAddress(req, res) {
    let id_client  = req.id
    try {
        if (id_client) {
            var addresses = await Address.findAll({ where: { id_client: id_client } })
        } else {
            var addresses = await Address.findAll()
        }
        return res.status(200).json({
            message: 'Addresses',
            data: addresses

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function deleteAddress(req, res) {
    const { id } = req.params
    try {
        let address = await Address.destroy({ where: { id: id } })
        return res.json({
            message: 'Address deleted successfully',
            data: address
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}
export async function updateAddress(req, res) {
    const { calle, altura, barrio, otros, codigo, numero } = req.body
    const { id } = req
    try {
        await Address.update({
            calle: calle,
            altura: parseInt(altura),
            barrio: barrio,
            otros: otros,
            codigo: codigo,
            numero: parseInt(numero),
        }, {
            where: { id: id }
        }
        )
        return res.json({
            message: 'Address updated successfully'
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Something goes Wrong',
            data: {}

        })

    }
}