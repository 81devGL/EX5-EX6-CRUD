#Description
- Ex5, EX6
- UI:  React final From, Rsuite
- API: JSON SEVER, https://provinces.open-api.vn/

### Describe
When choosing customers, automatically fill the necessary fields.

When choosing products, automatically fill the total (quantity, if available) and product pricing fields.

Automatic order code generation.

Enables users to create new orders and new customers if they are unable to choose existing customers from the search bar.

Logical management: the whole payment amount, the debit, Change payments and customer payments.

Allow discount (now expressed in dollars, to increase by %); apply discount to entire bill

Validating data fields

Remove order ,Filter orders ,Edit order, Search order, Multiple delete

Report filtration by date (total order amount, total debt)

Show order information

Automatically pick the most recent 7 days


# "Mô tả "
" 
# Login:

- Đăng nhập sử dụng API dummy
- Nếu chọn nhớ mật khẩu lần sau sẽ tự động đăng nhập, 
- Nếu không chọn nhớ sau khi đóng tab sẽ phải đăng nhập lại.
- Đăng xuất sẽ xoá thông tin lưu sẵn.

#Đơn hàng:

+ Sau khi select 1 sản phẩm sẽ fill luôn giá trị của trường đơn giá sản phẩm tương ứng với sản phẩm đó.

+ Sau khi select 1 khách hàng (user) thì các trường SDT , địa chỉ giao hàng sẽ tự fill.

+ Trường đơn giá và thành tiền theo format 1,000,000 VND.

+ Tính toán và xử lý tổng tiền đơn hàng(VAT, VOUCHER).

+ Tự động tạo mã đơn hàng.

+ Trường SDT fai có ít nhất 10 số , không thể gõ chữ.

+ Các trường mã đơn hàng , tên KH , tên SP là bắt buộc điền.

+ Bộ filter sẽ lọc theo tên KH , tên SP ; search input:  theo mã đơn hàng, tên khách hàng, SDT + Email.

+ CÓ THÔNG BÁO XỔ RA KHI THÊM MỚI THÀNH CÔNG HOẶC THẤT BẠI .
+ Thêm, sửa, xoá, lọc hoá đơn .

#DashBroad
+ Tại bảng top KH, sẽ hiển thị top 10 KH có giá trị đóng góp cao nhất , sắp xếp giảm dần.
+ Tại bảng Top SP , list 10 sp có số lần bán nhiều nhất , sắp xếp giảm dần.
+ Khi thêm sửa xoá đơn hàng, bảng DASHBROAD sẽ cập nhật theo.

#Bonus 

+ Cho phép tạo mới khách hàng ,nếu user không chọn được khách hàng ở thanh tìm kiếm.
+  Xử lý logic: Ghi nợ,  Tiền thừa, tiền khách đưa. 
+  Lọc báo cáo hoá đơn theo ngày( tổng tiền đơn hàng, tổng nợ, tổng số đơn).
+ Show chi tiết đơn hàng.
+ Tự động chọn 7 ngày gần nhất của danh sách đơn hàng.

#Pre setup
You need to install JSON SEVER on your computer in oder to run the database:
- `npm install -g json-server`

#load node-module 
`npm i`

#Run Front-End: `npm start`
- Open http://localhost:3001 to display it in your browser,
- Note: If port 3001 gets busy, you may modify it using the config vscode file.

# Thank you for your time

