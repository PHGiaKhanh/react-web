
# React Web

Frontend cho Trello clone, xây dựng bằng React và Vite. App hiện tại tập trung vào màn hình board, cho phép tạo board content với column, card, kéo thả và đồng bộ dữ liệu với backend Trello API.

## Requirements

```text
nodejs >= 18.16.0
npm = v9.5.1
yarn = v1.22.19

react: ^18.2.0
react-dom: ^18.2.0
@types/react: ^18.0.28
@types/react-dom: ^18.0.11

vite: ^4.3.2
@vitejs/plugin-react-swc: ^3.0.0

eslint: ^8.38.0
eslint-plugin-react: ^7.32.2
eslint-plugin-react-hooks: ^4.6.0
eslint-plugin-react-refresh: ^0.3.4
```

## Giới thiệu nhanh

App được khởi động từ [src/main.jsx](src/main.jsx), bọc toàn bộ UI bằng MUI theme provider, Confirm dialog provider và Toastify container. Component gốc ở [src/App.jsx](src/App.jsx) hiện render trực tiếp màn hình board tại [src/pages/Boards/_id.jsx](src/pages/Boards/_id.jsx).

Phần UI chính gồm:

- AppBar và menu điều hướng ở [src/components/AppBar](src/components/AppBar).
- Board bar hiển thị thông tin board ở [src/pages/Boards/BoardBar](src/pages/Boards/BoardBar).
- Board content, columns, cards và drag-and-drop ở [src/pages/Boards/BoardContent](src/pages/Boards/BoardContent).
- Chuyển đổi giao diện sáng/tối qua [src/components/ModeSelect](src/components/ModeSelect).

## Tính năng chính

- Hiển thị chi tiết board từ API backend.
- Sắp xếp lại columns và cards theo `columnOrderIds` / `cardOrderIds`.
- Tạo mới column.
- Tạo mới card.
- Cập nhật thứ tự column khi kéo thả.
- Cập nhật thứ tự card trong cùng column.
- Di chuyển card sang column khác.
- Xóa column và các card bên trong.
- Hiển thị toast và dialog xác nhận cho các thao tác quan trọng.

## Công nghệ sử dụng

- React 18.
- Vite.
- Material UI 7 với CSS variables theme.
- @dnd-kit cho drag and drop.
- Axios cho gọi API.
- Lodash cho xử lý dữ liệu.
- React Toastify cho thông báo.
- material-ui-confirm cho hộp thoại xác nhận.

## Cấu trúc thư mục chính

- [src/apis](src/apis) - các hàm gọi backend API.
- [src/components](src/components) - component dùng chung như AppBar và ModeSelect.
- [src/customHooks](src/customHooks) - custom hooks.
- [src/customLibraries](src/customLibraries) - cấu hình thư viện bổ trợ cho DnD.
- [src/pages](src/pages) - các màn hình và container chính.
- [src/utils](src/utils) - hằng số, formatter, sort helper.
- [src/theme.js](src/theme.js) - cấu hình theme và kích thước layout của Trello UI.


Mặc định Vite chạy ở chế độ development và app sẽ gọi backend qua cấu hình trong [src/utils/constants.js](src/utils/constants.js).

## Scripts

Các script có trong [package.json](package.json):

- `npm run dev` - chạy Vite dev server.
- `npm run build` - build production bundle.
- `npm run preview` - preview bản build local.
- `npm run lint` - kiểm tra code bằng ESLint.

## Cấu hình môi trường API

File [src/utils/constants.js](src/utils/constants.js) đang chọn API root theo `process.env.NODE_ENV`:

- `dev` -> `http://localhost:8017`
- `production` -> `https://trello-api-rlii.onrender.com`

Khi cần đổi backend, cập nhật giá trị này trong file trên.

## Luồng dữ liệu chính

1. [src/pages/Boards/_id.jsx](src/pages/Boards/_id.jsx) fetch chi tiết board từ backend.
2. Dữ liệu columns/cards được sắp xếp lại theo thứ tự lưu trong database.
3. UI render board, column, card theo state cục bộ.
4. Các thao tác tạo, sửa, xóa, kéo thả sẽ gọi hàm trong [src/apis/index.js](src/apis/index.js).
5. UI cập nhật state ngay sau thao tác để trải nghiệm mượt hơn.

## Ghi chú về kiến trúc

- Alias import `~` trỏ tới thư mục [src](src) thông qua [vite.config.js](vite.config.js).
- Theme MUI được tùy biến trong [src/theme.js](src/theme.js) để đồng bộ chiều cao app bar, board bar và board content.
- App hiện đang render trực tiếp board theo một `boardId` cố định trong [src/pages/Boards/_id.jsx](src/pages/Boards/_id.jsx). Khi mở rộng tiếp, nên chuyển sang lấy `boardId` từ router.
- Các thư mục [src/pages/Auth](src/pages/Auth) và [src/pages/Users](src/pages/Users) đang là nền cho những màn hình mở rộng sau này.

## Kết nối backend

Frontend này được thiết kế để chạy cùng backend Trello API trong cùng workspace. Trước khi dùng app, hãy đảm bảo API backend đã chạy và endpoint board detail trả về dữ liệu hợp lệ.

