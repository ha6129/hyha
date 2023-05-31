//날짜 당일셋팅
if (location.pathname == "/Inventory/Inventory") {
    var today = new Date().toISOString().substr(0, 10);
    document.getElementById("date").value = today;
}


//거래처리스트 조회버튼
function BtnList() {

    var datetime = document.getElementById("date").value;
    var code = document.getElementById("search").value;
    //입력값 유효성 검사 추가
    $.ajax(
        {
            url: '/Inventory/GetListStatus',
            data: { datetime: datetime, prodcode: code },
            dataType: 'json',
            method: 'post',
            success: function (res) {
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

                    child = "<td align='center'>" + (i + 1) + "</td>"
                        + "<td align='center'>" + data[i].Product.Code + "</td>"
                        + "<td align='center'>" + data[i].Product.Name + "</td>"
                        + "<td align='center'>" + data[i].Quantity + "</td>"


                    trow.innerHTML = child;
                }
            },

            error: function (xhr, status, error) {
                alert(error);
            }
        });
}

