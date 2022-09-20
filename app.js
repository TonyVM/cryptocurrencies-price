const binanceAPI = 'https://api.binance.com/'
const endPointPricesBinance = 'https://api.binance.com/api/v3/ticker/price'
const dataBody = document.querySelector('#data')
const selectExchange = document.querySelector('#exchangesList')
//https://api.kucoin.com/api/v1/prices   https://api.kucoin.com/api/v1/market/allTickers
const endPointPricesKucoin = 'https://api.kucoin.com/api/v1/market/allTickers'
const exchangeNameH1 = document.querySelector('#exchangeToShow')


// fetch(endPointPricesBinance)
//     .then( response => response.json())
//     .then( data => renderData(data))
//     .catch( error => console.log(error))

function getDataFromAPI(_endpoint, _exchange) {
    console.log(`El endpoint seleccionado es ${_endpoint}`);
    fetch(_endpoint)
        .then( response => response.json() )
        .then( data => renderData(data, _exchange) )        
        .catch( error => console.log(error) )
}

//analizar bien por que no renderiza la info de kucoin
function renderData(_data, _exchange) {
    exchangeNameH1.textContent = `on ${_exchange}`
    let row = ''
    if (_exchange === 'Binance') { 
        _data.forEach( e => {
            row += `<tr>
                <td class=".border-bottom">${e.symbol}</td>
                <td class=".border-bottom">${e.price}</td>
                </tr>`
        })
    } 
    if (_exchange === 'Kucoin') {
        _data.data.ticker.forEach( e => {
            row += `<tr>
                <td class=".border-bottom">${e.symbol}</td>
                <td class=".border-bottom">${e.last}</td>
                </tr>`
        })
        
        /**
         * for this endpoint https://api.kucoin.com/api/v1/prices
        Object.keys(_data.data).forEach( k => {
            row += `<tr>
                <td class=".border-bottom">${k}</td>
                <td class=".border-bottom">${_data.data[k]}</td>
                </tr>`
        })*/
    }
    
    dataBody.innerHTML = row
}

//this is the option selected in the <Select List>
// let selectedOpt = selectExchange.options[selectExchange.selectedIndex].value

/**
 * listen the change and save the value, then 
 * in an other action re-render the table with the prices in selected Exchange
 * 
 */
selectExchange.addEventListener('change', () => {
    console.clear()
    console.log('click');
    let selectedOpt = selectExchange.options[selectExchange.selectedIndex].value
    console.log(selectExchange.selectedIndex +' => '+ selectedOpt)
    if(selectedOpt === '')
        alert("Please, select a valid exchange")
    else {
        switch (selectedOpt) {
            case "Kucoin":
                getDataFromAPI(endPointPricesKucoin, selectedOpt)
                break;
            case "Binance":
                getDataFromAPI(endPointPricesBinance, selectedOpt)
                break;            
            default:
                break;
        }
    }
})
