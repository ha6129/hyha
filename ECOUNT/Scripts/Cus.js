//신규등록 버튼
function BtnNew() {

    location.href = "/Customer/CustomerRegist";
}

//리스트 보기 버튼
function BtnGoback() {
    location.href = "/Customer/CustomerList";
}

function RefreshCode() {
    document.getElementById('CustCode').value = "";
}
function RefreshName() {
    document.getElementById('CustName').value = "";
}
//거래처 저장버튼
function BtnSaveCust() {

    var code = document.getElementById('CustCode').value;
    var name = document.getElementById('CustName').value;

    $.ajax(
        {
            url: '/Customer/Save',
            data: { Code: code, Name: name },
            dataType: 'json',
            method: 'post',
            success: function (res) {
                if (res.StatusCode == 404) {
                    alert("값을 입력해주세요.")
                    RefreshCode();
                    RefreshName();
                }
                else if (res.StatusCode == 406) {
                    alert("중복된 코드입니다. 다른코드를 입력해주세요.")
                    RefreshCode();
                    RefreshName();
                }
                else {
                    alert("정상등록되었습니다.")
                    RefreshCode();
                    RefreshName();
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })
}

//거래처조회 누르면 바로 로드되도록
window.onload = BtnList();
//거래처리스트 조회버튼
function BtnList() {
    var code = document.getElementById("search").value;
    //입력값 유효성 검사 추가
    $.ajax(
        {
            url: '/Customer/Get',
            data: { code: code },
            dataType: 'json',
            method: 'post',
            success: function (res) {
                if (location.pathname == "/Customer/CustomerList") {
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

                        child = "<td align='center'><input type='checkbox' class='chkbox'></td>"
                            + "<td align='center'>" + (i + 1) + "</td>"
                            + "<td align='center' id='CustCode'>" + data[i].Code + "</td>"
                            + "<td align='center' id='CustName'>" + data[i].Name + "</td>";

                        trow.innerHTML = child;

                    }
                    return;
                }

            },

            error: function (xhr, status, error) {
                alert(error);
            }
        });
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
        alert('수정할 거래처를 하나만 선택해주세요.');
        return;
    }
    var custcode = checkedRows[0].cells[2].innerText;
    var custname = checkedRows[0].cells[3].innerText;

    location.href = "/Customer/CustomerRegist?Custcode=" + custcode + "&Custname=" + custname;
}

function BtnEditSave() {
    //var index = document.getElementById('index').value;
    var custcode = document.getElementById('CustCode').value;
    var custname = document.getElementById('CustName').value;


    var customer = { Customer: { Code: custcode, Name: custname } }

    $.ajax(
        {
            url: '/Customer/Update',
            data: JSON.stringify(customer),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            method: 'post',
            success: function (res) {
                console.log(res);
                if (res.StatusCode == 404) {
                    alert("값을 입력해주세요.")
                }
                else if (res.StatusCode == 406) {
                    alert("해당 거래처로 구매/판매 내역이 존재합니다. 수정 불가합니다.")
                }
                else {
                    alert("정상수정되었습니다.")
                    RefreshCode();
                    RefreshName();
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
        alert('삭제할 거래처를 선택해주세요.');
        return;
    }

    var customers = [];
    for (var i = 0; i < checkedRows.length; i++) {
        var code = checkedRows[i].parentNode.parentNode.cells[2].textContent;
        var name = checkedRows[i].parentNode.parentNode.cells[3].textContent;
        customers.push({ Code: code, Name: name });
    }

    var data = { customers: customers };

    $.ajax(
        {
            url: '/Customer/Delete',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            method: 'post',
            success: function (res) {
                console.log(res);
                if (res.StatusCode == 406) {
                    alert("해당 거래처로 구매/판매 내역이 존재합니다. 삭제 불가합니다.")
                }
                else {
                    alert("정상삭제되었습니다.")
                    window.location.reload()
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        })
}