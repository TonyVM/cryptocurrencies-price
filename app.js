const binanceAPI = 'https://api.binance.com/'
const endPointPricesBinance = 'https://api.binance.com/api/v3/ticker/price'
const dataBody = document.querySelector('#data')
const selectExchange = document.querySelector('#exchangesList')
const endPointPricesKucoin = 'https://api.kucoin.com/api/v1/market/allTickers'
const exchangeNameH1 = document.querySelector('#exchangeToShow')


// fetch(endPointPricesBinance)
//     .then( response => response.json())
//     .then( data => renderData(data))
//     .catch( error => console.log(error))

function getDataFromAPI(_endpoint, _exchange) {
    fetch(endPointPricesBinance)
        .then( response =>  response.json() )
        .then( data => { 
            // renderData(data, _exchange);
            console.log(data)            
        })
        .catch( error => console.log(error))
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
            // console.log(e)
        })
    } 
    if (_exchange === 'Kucoin') {
        _data.forEach( e => {
            row += `<tr>
                <td class=".border-bottom">${e.data.key}</td>
                <td class=".border-bottom">${e.data.value}</td>
                </tr>`
            // console.log(e)
        })
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
    console.log('click');
    let selectedOpt = selectExchange.options[selectExchange.selectedIndex].value
    console.log(selectExchange.selectedIndex +' => '+selectExchange.options[selectExchange.selectedIndex].value)
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


/**
 * {
  "code": "200000",
  "data": {
    "AGLD": "0.32466492"
    }
}
 */