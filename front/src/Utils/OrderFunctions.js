export async function OrderByPrice(orderTarget, product) {

    let productordenado
    if (product.tipe === 'Ascendent')
        productordenado = orderTarget.sort((a, b) => (
            a.price > b.price ? 1 : a.price < b.price ? -1 : 0),
        )

    if (product.tipe === 'Descendent')
        productordenado = orderTarget.sort((a, b) => (
            a.price < b.price ? 1 : a.price > b.price ? -1 : 0),
        )

    return productordenado;

}