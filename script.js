let n1, n2, op, ans, score = 0;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
}

function startGame() {
    // Lấy phép tính được chọn
    let ops = [];
    if(document.getElementById('add').checked) ops.push('+');
    if(document.getElementById('sub').checked) ops.push('-');
    if(document.getElementById('mul').checked) ops.push('*');
    if(document.getElementById('div').checked) ops.push('/');

    if(ops.length === 0) return alert("Chọn ít nhất 1 phép tính đi bé ơi!");

    // Ẩn cài đặt, hiện game
    document.getElementById('settingsPanel').style.display = 'none';
    document.getElementById('gamePanel').style.display = 'block';
    
    // Lưu cấu hình vào biến toàn cục để dùng lại
    window.cfg = {
        min: document.getElementById('minVal').value,
        max: document.getElementById('maxVal').value,
        ops: ops
    };
    nextQ();
}

function nextQ() {
    let c = window.cfg;
    op = c.ops[rand(0, c.ops.length - 1)];
    
    // Logic tạo số để không bị âm hoặc lẻ
    let a = rand(c.min, c.max);
    let b = rand(c.min, c.max);

    if (op === '+') {
        n1 = a; n2 = b; ans = a + b;
    } else if (op === '-') {
        n1 = Math.max(a, b); n2 = Math.min(a, b); ans = n1 - n2;
    } else if (op === '*') {
        n1 = a; n2 = rand(1, 10); ans = n1 * n2; // Nhân thì số thứ 2 nhỏ thôi
    } else {
        n2 = rand(2, 10); ans = rand(1, 10); n1 = n2 * ans; // Chia hết
    }

    // Hiển thị (Thay * thành x, / thành :)
    let displayOp = op === '*' ? '×' : (op === '/' ? ':' : op);
    document.getElementById('qText').innerText = `${n1} ${displayOp} ${n2} = ?`;
    document.getElementById('userAns').value = '';
    document.getElementById('userAns').focus();
    document.getElementById('msg').innerText = '';
}

function check() {
    let user = parseInt(document.getElementById('userAns').value);
    let msg = document.getElementById('msg');
    
    if(user === ans) {
        msg.innerText = "Giỏi quá! Chính xác 🎉";
        msg.style.color = "green";
        score++;
        document.getElementById('score').innerText = score;
        setTimeout(nextQ, 1000); // 1 giây sau tự qua câu mới
    } else {
        msg.innerText = "Sai rồi, tính lại nhé! 😅";
        msg.style.color = "red";
    }
}
