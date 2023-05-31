function BtnNew() {

    location.href = "/Sale/SaleRegist";
}

//재고현황 바로가기
function BtnInven() {

    location.href = "/Inventory/Inventory";
}

//리스트 보기 버튼
function BtnGoback() {
    location.href = "/Sale/SaleList";
}

//날짜 당일셋팅
if (location.pathname == "/Sale/SaleRegist") {
    var today = new Date().toISOString().substr(0, 10);
    document.getElementById("date").value = today;
}

//인풋박스 리셋
function Refresh() {
    document.getElementById("Customer").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("Product").value = "";
}

window.onload = CustListBox();
window.onload = ProdListBox();

function CustListBox() {
    //입력값 유효성 검사 추가
    if (location.pathname == "/Sale/SaleRegist") {
        $.ajax(
            {
                url: '/Customer/Get',
                data: {},
                dataType: 'json',
                method: 'post',
                success: function (res) {
                    console.log(res)

                    //var customerList = res;
                    var datalist = document.getElementById("selecbox");

                    //while (datalist.firstChild) {
                    //    datalist.removeChild(datalist.firstChild);
                    //}

                    for (i = 0; i < res.length; i++) {
                        var option = document.createElement('option')
                        option.value = res[i].Code + " " + res[i].Name;
                        datalist.appendChild(option);
                    }

                },

                error: function (xhr, status, error) {
                    alert(error);
                }
            });
    }
}

function ProdListBox() {
    //입력값 유효성 검사 추가
    if (location.pathname == "/Sale/SaleRegist") {
        $.ajax(
            {
                url: '/Product/GetListAll',
                data: {},
                dataType: 'json',
                method: 'post',
                success: function (res) {
                    console.log(res);
                    //var customerList = res;
                    var datalist = document.getElementById("selecbox2");

                    //while (datalist.firstChild) {
                    //    datalist.removeChild(datalist.firstChild);
                    //}

                    for (i = 0; i < res.length; i++) {
                        var option = document.createElement('option')
                        option.value = res[i].Code + " " + res[i].Name;
                        datalist.appendChild(option);
                    }

                },

                error: function (xhr, status, error) {
                    alert(error);
                }
            });
    }
}

function BtnInput() {
    var code = document.getElementById('Product').value.split(" ")[0];
    var name = document.getElementById('Product').value.split(" ")[1];
    var quantity = document.getElementById('quantity').value;
    var datetime = document.getElementById('date').value;
    var custcode = document.getElementById('Customer').value.split(" ")[0];
    var custname = document.getElementById('Customer').value.split(" ")[1];

    var sale = {
        Product: { Code: code, Name: name }, Quantity: quantity, Datatime: datetime, Customer: { Code: custcode, Name: custname }
    }
    $.ajax(
        {
            url: '/Sale/Save',
            data: JSON.stringify(sale),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            method: 'post',
            success: function (res) {
                console.log(res);
                if (res.StatusCode == 404) {
                    alert("값을 입력해주세요.")
                    Refresh()
                }
                else if (res.StatusCode == 406) {
                    alert("수량이 부족합니다.")
                    document.getElementById("quantity").value = ""; // 수량만 리셋
                }
                else {
                    alert("정상등록되었습니다.")
                    Refresh()
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })
}


window.onload = BtnList();
//거래처리스트 조회버튼
function BtnList() {
    //입력값 유효성 검사 추가
    if (location.pathname == "/Sale/SaleList") {
        var prodCode = document.getElementById("searchProd") ? document.getElementById("searchProd").value : null;
        var custCode = document.getElementById("searchCust") ? document.getElementById("searchCust").value : null;

        $.ajax(
            {

                url: '/Sale/GetHistory',
                data: { prodCode: prodCode, custCode: custCode },
                dataType: 'json',
                method: 'post',
                success: function (res) {
                    console.log(res);
                    //alert('목록을 불러왔습니다.');
                    data = res;
                    var body = document.getElementById("body");
                    // remove existing rows
                    while (body.firstChild) {
                        body.removeChild(body.firstChild);
                    }
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                        var body = document.getElementById("body");
                        var trow = document.createElement("tr");

                        body.append(trow);

                        var timestamp = data[i].DataTime.match(/\d+/)[0];
                        var date = new Date(parseInt(timestamp));
                        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                        var dateString = date.toISOString().split("T")[0];

                        child = "<td align='center'><input type='checkbox' class='chkbox'></td>"
                            + "<td align='center'>" + data[i].Index + "</td>"
                            + "<td align='center'>" + data[i].Customer.Code + "</td>"
                            + "<td align='center'>" + data[i].Customer.Name + "</td>"
                            + "<td align='center'>" + data[i].Product.Code + "</td>"
                            + "<td align='center'>" + data[i].Product.Name + "</td>"
                            + "<td align='center'>" + data[i].Quantity + "</td>"
                            + "<td align='center'>" + dateString + "</td>";

                        trow.innerHTML = child;
                    }
                },

                error: function (xhr, status, error) {
                    alert(error);
                }
            });
    }
}

//////////////////수정/삭제 관련 로직///////////////////////////////


//체크박스 전체 체크 로직
var isChecked = false;

function CheckAll() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = !isChecked;
    });
    isChecked = !isChecked;
}

//수정버튼
function BtnEdit() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checkedRows = [];
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedRows.push(checkbox.parentNode.parentNode);
        } else {
            // uncheck any other checkboxes that are already checked
            var cells = checkbox.parentNode.parentNode.cells;
            cells[0].getElementsByTagName('input')[0].checked = false;
            cells[1].classList.remove('selected-row');
        }
    });
    if (checkedRows.length !== 1) {
        alert('수정할 구매내역을 하나만 선택해주세요.');
        return;
    }
    var index = checkedRows[0].cells[1].innerText;
    var custcode = checkedRows[0].cells[2].innerText;
    var custname = checkedRows[0].cells[3].innerText;
    var prodcode = checkedRows[0].cells[4].innerText;
    var prodname = checkedRows[0].cells[5].innerText;
    var quantity = checkedRows[0].cells[6].innerText;
    var date = checkedRows[0].cells[7].innerText;


    var cust = custcode + " " + custname;
    var prod = prodcode + " " + prodname;


    location.href = "/Sale/SaleRegist?Customer=" + cust + "&Product=" + prod + "&quantity=" + quantity + "&date=" + date + "&index=" + index;
}

function BtnEditSave() {
    var index = document.getElementById('index').value;
    var code = document.getElementById('Product').value.split(" ")[0];
    var name = document.getElementById('Product').value.split(" ")[1];
    var quantity = document.getElementById('quantity').value;
    var datetime = document.getElementById('date').value;
    var custcode = document.getElementById('Customer').value.split(" ")[0];
    var custname = document.getElementById('Customer').value.split(" ")[1];

    var sale = {
        Index: index,
        Product: { Code: code, Name: name }, Quantity: quantity, Datatime: datetime, Customer: { Code: custcode, Name: custname }
    }
    $.ajax(
        {
            url: '/Sale/Update',
            data: JSON.stringify(sale),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            method: 'post',
            success: function (res) {
                console.log(res);
                if (res.StatusCode == 404) {
                    alert("값을 입력해주세요.")

                }
                else if (res.StatusCode == 406) {
                    alert("수량이 부족합니다.")
                    //document.getElementById('quantity').value="" // 수량만 리셋
                }
                else {
                    alert("정상등록되었습니다.")
                    Refresh()
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })
}
//삭제버튼
function BtnDelete() {

    var checkedRows = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedRows.length < 1) {
        alert('삭제할 구매내역을 선택해주세요.');
        return;
    }

    var sales = [];
    for (var i = 0; i < checkedRows.length; i++) {
        var index = checkedRows[i].parentNode.parentNode.cells[1].textContent;
        var custcode = checkedRows[i].parentNode.parentNode.cells[2].textContent;
        var prodcode = checkedRows[i].parentNode.parentNode.cells[4].textContent;
        var prodname = checkedRows[i].parentNode.parentNode.cells[5].textContent;
        var quantity = checkedRows[i].parentNode.parentNode.cells[6].textContent;
        var date = checkedRows[i].parentNode.parentNode.cells[7].textContent;

        sales.push({ index: index, Product: { Code: prodcode, Name: prodname }, quantity: quantity, datatime: date, Customer: { Code: custcode } });
    }

    var data = { sale: sales };

    $.ajax(
        {
            url: '/Sale/Delete',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            method: 'post',
            success: function (res) {
                console.log(res);
                alert("정상삭제되었습니다.")
                window.location.reload()
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })
}