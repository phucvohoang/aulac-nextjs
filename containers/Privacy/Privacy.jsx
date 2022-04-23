import React from 'react';
import ProductsHeader from '../../components/SectionHeader/SectionHeader.component.jsx';
import Link from 'next/link';
const Privacy = () => {
  return (
    <div className="news__container">
      <div className="news__header">
        <ProductsHeader title="Chính Sách" />
      </div>
      <div className="container__privacy">
        <h2 className="container__privacy--heading">Giới Thiệu</h2>
        <p className="container__privacy--text">
          Chào mừng bạn đến với nền tảng Âu Lạc (bao gồm website
          {<Link href="/"> https://www.aulacshop.com </Link>} và ứng dụng di
          động Âu Lạc) được được vận hành bởi CÔNG TY TNHH SX & KD THỰC PHẨM
          CHAY ÂU LẠC (gọi riêng và gọi chung là, "Âu Lạc", "chúng tôi", hay
          "của chúng tôi"). Âu Lạc nghiêm túc thực hiện trách nhiệm của mình
          liên quan đến bảo mật thông tin theo các quy định về bảo vệ bí mật
          thông tin cá nhân của pháp luật Việt Nam (“Luật riêng tư”) và cam kết
          tôn trọng quyền riêng tư và sự quan tâm của tất cả người dùng đối với
          các nền tảng Âu Lạc (“Nền tảng”) (chúng tôi gọi chung Các Nền tảng và
          các dịch vụ chúng tôi cung cấp như được mô tả trong Nền tảng của chúng
          tôi là "Các Dịch Vụ"). Chúng tôi nhận biết tầm quan trọng của dữ liệu
          cá nhân mà bạn đã tin tưởng giao cho chúng tôi và tin rằng chúng tôi
          có trách nhiệm quản lý, bảo vệ và xử lý dữ liệu cá nhân của bạn một
          cách thích hợp. Chính sách bảo mật này ("Chính sách bảo mật" hay
          "Chính sách") được thiết kế để giúp bạn hiểu được cách thức chúng tôi
          thu thập, sử dụng, tiết lộ và/hoặc xử lý dữ liệu cá nhân mà bạn đã
          cung cấp cho chúng tôi và/hoặc lưu giữ về bạn, cho dù là hiện nay hoặc
          trong tương lai, cũng như để giúp bạn đưa ra quyết định sáng suốt
          trước khi cung cấp cho chúng tôi bất kỳ dữ liệu cá nhân nào của bạn.
        </p>
        <p className="container__privacy--text">
          "Dữ Liệu Cá Nhân" hay "dữ liệu cá nhân" có nghĩa là dữ liệu, dù đúng
          hay không, về một cá nhân mà thông qua đó có thể được xác định được
          danh tính, hoặc từ dữ liệu đó và thông tin khác mà một tổ chức có hoặc
          có khả năng tiếp cận. Các ví dụ thường gặp về dữ liệu cá nhân có thể
          gồm có tên, và thông tin liên hệ.
        </p>
        <p className="container__privacy--text">
          Bằng việc sử dụng Các Dịch Vụ, đăng ký một tài khoản với chúng tôi
          hoặc truy cập Nền tảng, bạn xác nhận và đồng ý rằng bạn chấp nhận các
          phương pháp, yêu cầu, và/hoặc chính sách được mô tả trong Chính sách
          bảo mật này, và theo đây bạn đồng ý cho phép chúng tôi thu thập, sử
          dụng và/hoặc xử lý dữ liệu cá nhân của bạn như mô tả trong đây. NẾU
          BẠN KHÔNG ĐỒNG Ý CHO PHÉP XỬ LÝ DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ MÔ TẢ
          TRONG CHÍNH SÁCH NÀY, VUI LÒNG KHÔNG SỬ DỤNG CÁC DỊCH VỤ CỦA CHÚNG TÔI
          HAY TRUY CẬP NỀN TẢNG HOẶC TRANG WEB CỦA CHÚNG TÔI. Nếu chúng tôi thay
          đổi Chính sách bảo mật của mình, chúng tôi sẽ đăng những thay đổi đó
          hoặc Chính sách bảo mật sửa đổi trên Nền tảng của chúng tôi.
        </p>

        <h2 className="container__privacy--sub-heading">
          ÂU LẠC SẼ THU THẬP NHỮNG DỮ LIỆU GÌ?
        </h2>
        <p className="container__privacy--text">
          Dữ liệu cá nhân mà Âu Lạc có thể thu thập bao gồm:
        </p>
        <ol className="container__privacy--list">
          <li>Họ Tên</li>
          <li>Địa Chỉ Email</li>
          <li>Địa Chỉ Thanh Toán</li>
          <li>Số Điện Thoại</li>
        </ol>
        <p className="container__privacy--text">
          Nếu bạn đăng nhập để trở thành Người sử dụng các Nền tảng của chúng
          tôi sử dụng tài khoản mạng xã hội của Bạn (“Tài khoản Mạng Xã hội”),
          liên kết tài khoản của bạn với Tài khoản Mạng Xã hội của bạn hoặc sử
          dụng bất cứ tính năng mạng xã hội Âu Lạc nào, chúng tôi có quyền truy
          cập thông tin về bạn (Email, Tên) mà bạn đã cung cấp một cách tự
          nguyên cho nhà cung cấp dịch vụ Tài khoản Mạng Xã hội của Bạn tuân
          theo các chính sách của các nhà cung cấp dịch vụ này, và chúng tôi sẽ
          quản lý và sử dụng các dữ liệu cá nhân này của bạn theo các quy định
          của Chính sách này tại mọi thời điểm.
        </p>
        <p className="container__privacy--text">
          Nếu bạn không muốn chúng tôi thu thập thông tin/dữ liệu cá nhân nói
          trên, bạn có thể chọn không tham gia vào bất kỳ lúc nào bằng cách
          thông báo bằng văn bản đến Nhân Viên Bảo Vệ Dữ Liệu của chúng tôi. Có
          thể tìm thấy thêm thông tin về nội dung trong mục "Bạn có thể rút lại
          sự cho phép xóa tên, yêu cầu truy cập hoặc điều chỉnh thông tin bạn đã
          cung cấp cho chúng tôi bằng cách nào?" dưới đây. Tuy nhiên, lưu ý rằng
          việc từ chối hoặc hủy bỏ cho phép chúng tôi thu thập, sử dụng hoặc xử
          lý dữ liệu cá nhân của bạn có thể ảnh hưởng đến việc bạn sử dụng Các
          Dịch Vụ và Nền tảng.
        </p>
        <h1 className="container__privacy--sub-heading">
          CHÚNG TÔI SỬ DỤNG THÔNG TIN BẠN CUNG CẤP CHO CHÚNG TÔI NHƯ THẾ NÀO?
        </h1>
        <p className="container__privacy--text">
          Chúng tôi có thể thu thập, sử dụng, và xử lý dữ liệu cá nhân của bạn
          cho các mục đích sau đây:
        </p>
        <ol className="container__privacy--list">
          <li>
            Để xem xét và/hoặc xử lý đơn đăng ký/giao dịch của bạn với chúng tôi
          </li>
          <li>
            Để quản lý, điều hành, cung cấp và/hoặc quản lý việc bạn sử dụng
            và/hoặc truy cập Các Dịch Vụ và các Nền tảng của chúng tôi
          </li>
          <li>
            Để đáp ứng, xử lý, giải quyết hoặc hoàn tất một giao dịch và/hoặc
            đáp ứng các yêu cầu của bạn đối với các sản phẩm và dịch vụ nhất
            định và thông báo cho bạn về các vấn đề dịch vụ và các hoạt động tài
            khoản bất thường
          </li>
          <li>
            Để liên hệ với bạn hoặc liên lạc với bạn qua điện thoại, tin nhắn
            văn bản và/hoặc tin nhắn fax, email và/hoặc thư hoặc cách khác nhằm
            mục đích quản trị và/hoặc quản lý quan hệ của bạn với chúng tôi hoặc
            việc bạn sử dụng Các Dịch Vụ của chúng tôi, chẳng hạn như ở việc
            truyền đạt thông tin hành chính cho bạn liên quan đến Các Dịch Vụ
            của chúng tôi. Bạn xác nhận và đồng ý rằng sự liên lạc như thế của
            chúng tôi có thể là theo cách gửi thư qua đường bưu điện, tài liệu
            hoặc thông báo cho bạn, có thể gồm có tiết lộ dữ liệu cá nhân nhất
            định về bạn để cung cấp các tài liệu đó cũng như trên bao bì/phong
            bì
          </li>
        </ol>
        <h2 className="container__privacy--sub-heading">
          BẠN CÓ THỂ RÚT TÊN, XÓA TÊN, YÊU CẦU TRUY CẬP HOẶC ĐIỀU CHỈNH THÔNG
          TIN BẠN ĐÃ CUNG CẤP CHO CHÚNG TÔI BẰNG CÁCH NÀO?
        </h2>
        <p>Bạn có thể:</p>
        <ol className="container__privacy--list">
          <li>Rút Lại Sự Đồng Ý</li>
          <li>
            Bạn có thể rút lại sự đồng ý cho phép thu thập, sử dụng và/hoặc tiết
            lộ và/hoặc yêu cầu xóa dữ liệu cá nhân của bạn mà chúng tôi đang lưu
            giữ hoặc kiểm soát bằng cách gửi tin nhắn cho nhân viên quản trị của
            chúng tôi qua tính năng nhắn tin (biểu tượng nằm ở góc dưới bên phải
            màn hình của bạn), và chúng tôi sẽ xử lý các yêu cầu này theo Chính
            Sách Bảo Mật cũng như quy định pháp luật có liên quan. Tuy nhiên,
            việc bạn rút lại sự cho phép của bạn có thể đồng nghĩa với việc
            chúng tôi sẽ không thể tiếp tục cung cấp các Dịch vụ đến bạn và
            chúng tôi có thể cần phải chấm dứt mối quan hệ hiện tại giữa bạn
            và/hoặc hợp đồng mà bạn có với Chúng tôi.
          </li>
          <li>
            Khi bạn chia sẻ nội dung trên YouTube, bên cạnh việc rút lại sự cho
            phép của bạn bằng việc gửi tin nhắn cho chúng tôi phù hợp với quy
            định tại Điều 1, bạn cũng có thể rút lại quyền truy cập của Âu Lạc
            vào dữ liệu cá nhân của bạn thông qua trang cài đặt an ninh của
            Google tại địa chỉ:
            https://security.google.com/settings/security/permissions.{' '}
          </li>
        </ol>
        <p>Yêu Cầu Truy Cập đến hoặc Sửa Dữ Liệu Cá Nhân</p>
        <ol className="container__privacy--list">
          <li>
            Nếu bạn đã đăng ký một tài khoản với chúng tôi, cá nhân bạn có thể
            truy cập và/hoặc sửa dữ liệu cá nhân của bạn mà chúng tôi đang lưu
            giữ hoặc kiểm soát thông qua trang Thông Tin Tài Khoản. Nếu bạn chưa
            đăng ký tài khoản với chúng tôi, cá nhân bạn có thể yêu cầu truy cập
            và/hoặc sửa dữ liệu cá nhân của bạn mà chúng tôi đang lưu giữ hoặc
            kiểm soát bằng cách gửi yêu cầu bằng văn bản cho chúng tôi. Chúng
            tôi sẽ cần có đủ thông tin từ bạn để xác định danh tính của bạn cũng
            như bản chất yêu cầu của bạn để có thể giải quyết yêu cầu của bạn.
          </li>
          <li>
            RChúng tôi có thể tính một khoản phí hợp lý cho bạn để giải quyết và
            xử lý yêu cầu truy cập dữ liệu cá nhân của bạn. Nếu chúng tôi có
            tính phí, chúng tôi sẽ cung cấp cho bạn ước tính lệ phí bằng văn
            bản. Vui lòng lưu ý rằng chúng tôi không buộc phải đáp ứng hay giải
            quyết yêu cầu truy cập của bạn trừ phi bạn đã đồng ý đóng phí
          </li>
          <li>
            Chúng tôi bảo lưu quyền từ chối sửa dữ liệu cá nhân của bạn theo các
            quy định của pháp luật về bảo vệ bí mật thông tin cá nhân, trường
            hợp các điều luật đó yêu cầu và/hoặc cho phép một tổ chức từ chối
            sửa dữ liệu cá nhân trong các trường hợp như thế.
          </li>
        </ol>
        <h4 className="container__privacy--inform">
          Bản Cập Nhật ngày 21/01/2022.
        </h4>
      </div>
    </div>
  );
};

export default Privacy;
