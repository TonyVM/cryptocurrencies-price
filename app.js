const binanceAPI = 'https://api.binance.com/'
const endpointPrices = 'https://api.binance.com/api/v3/ticker/price'
const dataBody = document.querySelector('#data')
const selectExchange = document.querySelector('#exchanges')

fetch(endpointPrices)
    .then( response => response.json())
    .then( data => renderData(data))
    .catch( error => console.log(error))


function renderData(_data) {
    let row = ''
    _data.forEach( e => {
        row += `<tr>
            <td class=".border-bottom">${e.symbol}</td>
            <td class=".border-bottom">${e.price}</td>
            </tr>`
    });
    dataBody.innerHTML = row
}

//this is the option selected in the <Select List>
let selectedOpt = selectExchange.options[selectExchange.selectedIndex].value

/**
 * listen the change and save the value, then 
 * in an other action re-render the table with the prices in selected Exchange
 * 
 */
selectExchange.addEventListener('change', () => {
    const selectedOpt = selectExchange.options[selectExchange.selectedIndex].value
    console.log(selectExchange.options[selectExchange.selectedIndex].value)
})
