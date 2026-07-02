import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  vi: {
    // Header & Navigation
    nav_status: 'Thực Trạng',
    nav_sensor: 'Cảm Biến',
    nav_portability: 'Sự Êm Ái',
    nav_specs: 'Thông Số',
    nav_usecases: 'Ứng Dụng',
    cta_now: 'SỞ HỮU NGAY',

    // Hero Section
    hero_badge: 'HELIRING PRO • THIẾT BỊ SINH HIỂN Y SINH CAO CẤP',
    hero_title_1: 'HELIRING',
    hero_title_2: 'CHỦ ĐỘNG',
    hero_title_3: 'SỐNG KHỎE.',
    hero_desc: 'Nhẫn sức khỏe thông minh thế hệ mới từ HELICORP. Tích hợp cảm biến y khoa siêu vi để theo dõi liên tục nhịp tim, nồng độ oxy trong máu SpO2, stress và chất lượng giấc ngủ với thiết kế Titanium chuẩn hàng không cực đỉnh.',
    hero_feat_ppg: 'Cảm biến PPG y sinh đo 24/7',
    hero_feat_material: 'Chất liệu Titanium Kháng Nước IP68',
    hero_feat_temp: 'Đo Nhiệt Độ Cơ Thể & Stress',
    hero_feat_battery: 'Pin sạc siêu mỏng dùng tới 7 ngày',
    hero_cta_guide: 'NHẬN CẨM NANG SỨC KHỎE',
    hero_cta_structure: 'Xem cấu tạo cảm biến',
    hero_hud_recovery: 'RECOVERY',
    hero_hud_recovery_desc: 'Chỉ số phục hồi hoàn hảo',
    hero_hud_sleep: 'CHỈ SỐ GIẤC NGỦ',
    hero_hud_sleep_desc: 'Thời gian ngủ sâu đạt chuẩn lâm sàng.',
    hero_hud_sensor: 'Cảm biến sinh học',
    hero_scroll_down: 'Cuộn để phân tích sinh hiệu',

    // Problem Section (Thực Trạng)
    problem_badge: 'Thực trạng sức khỏe hiện đại',
    problem_title_1: 'Bạn Có Thực Sự',
    problem_title_2: 'Hiểu Rõ Sinh Hiệu?',
    problem_desc: 'Áp lực cuộc sống hiện đại đẩy cơ thể vào các trạng thái căng thẳng mãn tính mà các giác quan thông thường không thể nhận biết. Hơn 85% tín hiệu cảnh báo sớm từ tim mạch và giấc ngủ bị bỏ qua, dẫn đến những hậu quả kiệt sức đột ngột.',
    problem_threat_label: 'Hiểm họa sức khỏe',
    problem_threat_impact: 'Hậu quả trực tiếp',
    problem_scroll: 'Hãy cuộn để khám phá giải pháp sinh hiệu y khoa từ HELICORP',

    threat_1_title: 'Quá Tải Căng Thẳng & Burnout',
    threat_1_sub: 'Kiệt sức tinh thần âm thầm',
    threat_1_desc: 'Cường độ làm việc cao khiến hệ thần kinh giao cảm luôn ở trạng thái báo động, tích tụ hoocmon Cortisol gây suy giảm trí nhớ, rối loạn cảm xúc và suy kiệt năng lượng.',
    threat_1_impact: 'Rối loạn nhịp tim kéo dài, suy giảm khả năng tập trung sáng tạo.',

    threat_2_title: 'Khủng Hoảng Chất Lượng Giấc Ngủ',
    threat_2_sub: 'Phá hủy nhịp sinh học',
    threat_2_desc: 'Ánh sáng xanh và áp lực tinh thần làm giảm hụt hormone Melatonin. Việc thiếu hụt giai đoạn ngủ sâu (Deep Sleep) khiến các tế bào não không thể thải độc và phục hồi cơ bắp.',
    threat_2_impact: 'Gây lão hóa sớm, tăng huyết áp mãn tính và mệt mỏi thể chất kéo dài.',

    threat_3_title: 'Hội Chương Ít Vận Động',
    threat_3_sub: 'Kẻ giết người thầm lặng',
    threat_3_desc: 'Ngồi làm việc liên tục trên 6 tiếng mỗi ngày làm chậm quá trình trao đổi chất, suy giảm độ nhạy Insulin và tăng gấp đôi nguy cơ mắc các bệnh tim mạch hiểm nghèo.',
    threat_3_impact: 'Giảm sút tuần hoàn máu trên não, tích tụ mỡ thừa nội tạng nguy hiểm.',

    // TechShowcase Section (Giải Phẫu Công Nghệ)
    tech_badge: 'Công nghệ chế tác đỉnh cao',
    tech_title_1: 'Giải Phẫu Công Nghệ',
    tech_title_2: 'Chữa Lành Sinh Học',
    tech_desc: 'Sự hội tụ tinh tế của vi mạch điện tử siêu nhỏ, màng cảm biến quang học chất lượng cao và hợp kim Titanium siêu chịu lực mang lại trải nghiệm đeo êm ái hoàn hảo.',
    tech_instructions: '* Click chọn các mô-đun để giải phẫu chi tiết',
    tech_cert_label_1: 'Tiêu chuẩn',
    tech_cert_val_1: 'Y tế FDA',
    tech_cert_label_2: 'Bảo mật',
    tech_cert_val_2: 'HIPAA Data',
    tech_cert_label_3: 'Chống nước',
    tech_cert_val_3: '50m IP68',

    layer_0_name: 'Mạng Cảm Biến PPG Quang Học Tần Số Kép',
    layer_0_sub: 'Dual-PPG Matrix',
    layer_0_eff: 'Độ chính xác lâm sàng 98.6%',
    layer_0_desc: 'Tích hợp 4 cụm diode quang hồng ngoại và bước sóng xanh độc quyền, liên tục chiếu xuyên qua mao mạch ngón tay để thu nhận tần số co bóp cơ tim, HRV và nồng độ SpO2 theo thời gian thực.',

    layer_1_name: 'Cảm Biến Nhiệt Điện Trở Chuẩn Lâm Sàng',
    layer_1_sub: 'Bio-Temp Sensor',
    layer_1_eff: 'Độ nhạy nhiệt độ 0.05°C',
    layer_1_desc: 'Đo liên tục nhiệt độ da ngón tay để phát hiện sớm các dấu hiệu nhiễm trùng, chu kỳ rụng trứng hoặc phản ứng sốt trước khi cơ thể biểu hiện triệu chứng.',

    layer_2_name: 'Vi Mạch Xử Lý SoC Siêu Tích Hợp',
    layer_2_sub: 'Heli Cortex-M4',
    layer_2_eff: 'Tiêu thụ điện năng cực thấp',
    layer_2_desc: 'Bộ não trung tâm chạy thuật toán lọc nhiễu chuyển động chủ động, đảm bảo tín hiệu đo đạc không bị sai lệch ngay cả khi chạy bộ hay làm việc nhà.',

    layer_3_name: 'Vỏ Titanium Cấp Y Tế & Nhựa Sinh Học',
    layer_3_sub: 'Titanium G5 & Resin',
    layer_3_eff: 'Chống dị ứng da 100%',
    layer_3_desc: 'Lớp Titanium siêu cứng bên ngoài kết hợp lớp nhựa sinh học y tế không chứa độc tố ở mặt trong mang lại sự an toàn tuyệt đối và thoải mái tối đa.',

    // Portability Section (Sự Êm Ái)
    port_badge: 'Thiết kế tối giản công học',
    port_title_1: 'Mỏng Nhẹ',
    port_title_2: 'Như Vô Hình',
    port_desc: 'Được tinh giản đến từng micro-met, HeliRing Pro loại bỏ hoàn toàn cảm giác vướng víu của các thiết bị đeo cổ tay truyền thống, đồng hành cùng bạn cả ngày lẫn đêm.',
    port_hud_sys: 'HỆ THỐNG',
    port_hud_conn: 'ĐANG KẾT NỐI',
    port_hud_sync: 'ĐỒNG BỘ THỜI GIAN THỰC',
    port_hud_bat: 'PIN SẠC TIÊU CHUẨN',
    port_hud_bat_val: '7 NGÀY',
    port_hud_bat_desc: 'Thời lượng sử dụng thực tế',
    port_hud_sys_ok: 'Đã đồng bộ thành công',

    feat_port_1_title: 'Trọng Lượng Siêu Nhẹ 2.8g',
    feat_port_1_desc: 'Mỏng chỉ 2.5mm, nhẹ hơn một đồng xu thông thường, mang lại cảm giác đeo tự nhiên giống như vô hình.',
    feat_port_2_title: 'Độ Mỏng Kinh Ngạc 2.5mm',
    feat_port_2_desc: 'Tích hợp pin sạc micro-density an toàn, đồng hành suốt tuần mà không cần lo lắng về việc sạc pin mỗi ngày.',
    feat_port_3_title: 'Thiết Thiết Kế Không Cạnh Gờ',
    feat_port_3_desc: 'Đầy đủ các size từ US 6 đến 13. Khách hàng được tặng kèm bộ Kit đo size ngón tay miễn phí tại nhà.',
    port_feat_1_lbl: 'SIÊU NHẸ ÊM ÁI',
    port_feat_1_val: '2.8g',
    port_feat_2_lbl: 'NĂNG LƯỢNG BỀN BỈ',
    port_feat_2_val: '7 Ngày',
    port_feat_3_lbl: 'SỰ TIỆN LỢI ĐA DẠNG',
    port_feat_3_val: '8 Kích cỡ',

    // VitalsSimulator Section (Bản Thử Nghiệm Sinh Hiệu)
    sim_badge: 'Mô phỏng sinh hiệu thực tế',
    sim_title_1: 'Bản Thử Nghiệm',
    sim_title_2: 'Sinh Hiệu Lâm Sàng',
    sim_desc: 'Trải nghiệm tương tác thời gian thực cách HeliRing Pro liên tục thu nhận, phân tích dữ liệu sinh trắc học và phản hồi thông minh dựa trên trạng thái hoạt động thực tế.',
    sim_control: 'Bảng điều khiển trạng thái',
    sim_choose: 'Chọn Chế Độ Đo',
    sim_mode_desc: 'Mô phỏng các ngữ cảnh sinh hoạt để kiểm nghiệm sự thích ứng của cảm biến PPG tần số kép tích hợp trên HeliRing Pro.',
    sim_ecg_btn: 'Kích Hoạt Điện Tâm Đồ (ECG)',
    sim_ecg_btn_scanning: 'ĐANG QUÉT ECG...',
    sim_ecg_result: 'KẾT QUẢ PHÂN TÍCH ECG LÂM SÀNG',
    sim_ecg_desc: 'Nhấn nút phía trên để kích hoạt quét luồng sóng điện tim trực tiếp qua màng cảm biến.',
    sim_live_title: 'MÀN HÌNH THEO DÕI THỜI GIAN THỰC',
    sim_live_desc: 'Tín hiệu số hóa từ chip SoC Cortex-M4 (Độ trễ < 15ms)',
    sim_hr_label: 'NHỊP TIM',
    sim_spo2_label: 'OXY MÁU',
    sim_temp_label: 'NHIỆT ĐỘ',
    sim_hrv_label: 'BIẾN THIÊN HRV',
    sim_stress_label: 'STRESS INDEX',

    profile_resting_name: 'Nghỉ ngơi / Sleep',
    profile_resting_lbl: 'Thư giãn',
    profile_resting_status: 'Nhịp tim ổn định. Trạng thái nghỉ ngơi giúp giảm tải tối đa cho hệ tim mạch.',
    profile_resting_desc: 'Hệ thần kinh đối giao cảm chiếm ưu thế, thúc đẩy phục hồi và tích lũy năng lượng.',

    profile_workout_name: 'Vận động / Cardio',
    profile_workout_lbl: 'Hoạt động mạnh',
    profile_workout_status: 'Đang đốt mỡ hiệu quả. Tim co bóp mạnh để bơm oxy tới các cơ bắp.',
    profile_workout_desc: 'Hệ tim mạch vận hành ở công suất cao, tăng cường tuần hoàn và sức bền.',

    profile_stress_name: 'Căng thẳng / High Stress',
    profile_stress_lbl: 'Áp lực cao',
    profile_stress_status: 'Mức cortisol cao. Đề xuất bài tập thở hộp (Box Breathing) ngay lập tức.',
    profile_stress_desc: 'Hệ thần kinh giao cảm kích hoạt quá mức, cần hạ nhiệt tinh thần.',

    profile_sleep_name: 'Ngủ sâu / Deep REM',
    profile_sleep_lbl: 'Phục hồi não bộ',
    profile_sleep_status: 'Tế bào não đang đào thải độc tố, cơ bắp được sửa chữa toàn diện.',
    profile_sleep_desc: 'Trạng thái ngủ sâu lý tưởng để củng cố trí nhớ và hệ miễn dịch.',

    diag_resting: 'Điện tâm đồ (ECG) bình thường. Nhịp xoang đều, không phát hiện dấu hiệu rối loạn nhịp tim.',
    diag_workout: 'Nhịp tim nhanh sinh lý do vận động cơ bắp. Khả năng thích nghi tim mạch xuất sắc.',
    diag_stress: 'Phát hiện nhịp tim không đều nhẹ (HRV thấp). Khuyên dùng kỹ thuật thở điều hòa 4-7-8 để giảm stress.',
    diag_sleep: 'Nhịp tim chậm sinh lý trong giấc ngủ. Chỉ số hồi phục thần kinh thực vật đạt mức tối đa.',

    // Specs Section (Bảng Thông Số)
    specs_badge: 'Thông số kỹ thuật sản phẩm',
    specs_title_1: 'Bảng Thông Số',
    specs_title_2: 'Cơ Khí & Sinh Học',
    specs_desc: 'HeliRing Pro sở hữu những chỉ số kỹ thuật xuất sắc, minh chứng cho năng lực cơ khí chính xác hàng đầu từ HELICORP.',
    specs_label: 'Thông số',

    spec_1_title: 'Hợp Kim Chế Tác',
    spec_1_sub: 'Vỏ Nhẫn',
    spec_1_val: 'Grade 5 Titanium',
    spec_1_desc: 'Bền gấp 4 lần thép không gỉ, siêu nhẹ, kháng xước tuyệt hảo.',

    spec_2_title: 'Tiêu Chuẩn Kháng Nước',
    spec_2_sub: 'Hệ Thống',
    spec_2_val: '5ATM / IP68',
    spec_2_desc: 'An toàn đi mưa, rửa tay, bơi lội hoặc lặn nông ở độ sâu 50m.',

    spec_3_title: 'Thời Gian Sạc Điện',
    spec_3_sub: 'Năng Lượng',
    spec_3_val: '45 Phút đầy',
    spec_3_desc: 'Sử dụng liên tục lên đến 7 ngày nhờ công nghệ pin Lithium-Polymer vi mô.',

    spec_4_title: 'Kết Nối Truyền Tải',
    spec_4_sub: 'Đồng Bộ',
    spec_4_val: 'Bluetooth Low Energy',
    spec_4_desc: 'Chuẩn BLE thế hệ mới tối ưu pin, đồng bộ dữ liệu siêu tốc và an toàn.',

    spec_5_title: 'Độ Dày Thành Nhẫn',
    spec_5_sub: 'Kích Thước',
    spec_5_val: '2.5 mm',
    spec_5_desc: 'Độ mỏng cơ khí vượt trội giúp ôm khít ngón tay không gây cản trở.',

    spec_6_title: 'Vi Xử Lý Tính Toán',
    spec_6_sub: 'Cấu Trúc',
    spec_6_val: 'Cortex-M4 SoC',
    spec_6_desc: 'Chip xử lý tín hiệu y sinh tích hợp bộ lọc nhiễu tự động thời gian thực.',

    // UseCases Section (Đồng hành cùng bạn)
    cases_badge: 'Ứng dụng thực tế cuộc sống',
    cases_title_1: 'Đồng Hành Cùng Bạn',
    cases_title_2: 'Mọi Khoảnh Khắc',
    cases_desc: 'HeliRing Pro hoạt động bền bỉ, âm thầm phân tích các chỉ số phức tạp để biến chúng thành những gợi ý cải thiện thói quen sống dễ hiểu nhất.',
    cases_metric_label: 'CHỈ SỐ SENSOR',

    case_1_title: 'Hiệu Suất Văn Phòng & Kiểm Soát Stress',
    case_1_sub: 'Tập trung đỉnh cao',
    case_1_desc: 'Khi bạn làm việc căng thẳng, HeliRing Pro phát hiện nhịp tim dồn dập & HRV sụt giảm, lập tức gửi gợi ý tập hít thở sâu qua app để cân bằng năng lượng giao cảm.',
    case_1_val: 'Nhận diện stress < 5s',

    case_2_title: 'Tập Luyện Tự Động & Thể Chất Bền Bỉ',
    case_2_sub: 'Phục hồi thể chất',
    case_2_desc: 'Tự động nhận diện các bộ môn: Chạy bộ, đạp xe, bơi lội, gym. Đo nhịp tim tối đa và tính toán chuẩn lượng calories tiêu thụ thực tế mà không cần bấm thủ công.',
    case_2_val: 'Kháng nước 50 mét',

    case_3_title: 'Giấc Ngủ Sinh Học & Đánh Giá Phục Hồi',
    case_3_sub: 'Nhịp sinh học chuẩn',
    case_3_desc: 'Theo dõi từng nhịp thở, độ bão hòa oxy SpO2 và nhiệt độ cơ thể khi ngủ. Bạn sẽ hiểu sâu sắc vì sao sáng thức dậy thấy mệt hay tràn đầy sinh lực.',
    case_3_val: 'Đo lường REM chính xác',

    // CTA Section
    cta_badge: 'Cơ hội nhận ưu đãi đặc quyền',
    cta_title_1: 'Nhận Cẩm Nang &',
    cta_title_2: 'Ưu Đãi Đặt Trước 25%',
    cta_desc: 'Hãy là những người đầu tiên sở hữu công nghệ theo dõi sức khỏe đột phá từ HELICORP và nhận thông tin khoa học mới nhất về sinh hiệu.',
    cta_benefits_title: 'Đặc quyền khi đăng ký nhận tin:',
    cta_benefit_1: 'Nhận E-Book Cẩm Nang Chữa Lành Sinh Học miễn phí',
    cta_benefit_2: 'Mã giảm giá 25% đặt trước sản phẩm sớm nhất',
    cta_benefit_3: 'Thử nghiệm trước các bản cập nhật app HeliHealth',
    cta_benefit_4: 'Bảo hành chính hãng 1 đổi 1 trong 12 tháng',
    cta_form_email_placeholder: 'Nhập địa chỉ email của bạn...',
    cta_form_btn: 'Đăng Ký Nhận Ưu Đãi',
    cta_form_sending: 'ĐANG ĐĂNG KÝ...',
    cta_form_success_title: 'Đăng ký nhận tin thành công! 🎉',
    cta_form_success_desc: 'Hệ thống đã ghi nhận email của bạn. Kiểm tra hộp thư sớm nhé!',
    cta_form_error_title: 'Đã xảy ra lỗi!',
    cta_form_error_desc: 'Không thể gửi email đăng ký. Vui lòng thử lại sau.',

    // Footer
    footer_desc: 'Tiên phong thiết bị đeo sinh học thông minh tối giản, giúp bạn làm chủ sinh hiệu cơ thể từng giây.',
    footer_copyright: '© 2026 HELICORP Co., Ltd. Tất cả quyền được bảo lưu.',
    footer_terms: 'Điều khoản dịch vụ',
    footer_privacy: 'Chính sách bảo mật',

    // Chatbot
    chat_greeting: 'Xin chào! Tôi là trợ lý AI của HeliCorp. Tôi có thể giúp gì cho bạn về sản phẩm nhẫn sức khỏe thông minh HeliRing Pro?',
    chat_online: 'Trực tuyến • Phản hồi ngay',
    chat_placeholder: 'Hỏi về thời lượng pin, chất liệu...',
    chat_quick_1: 'Trọng lượng nhẫn bao nhiêu?',
    chat_quick_2: 'Thời lượng pin dùng được bao lâu?',
    chat_quick_3: 'Nhẫn làm bằng chất liệu gì?',
    chat_quick_4: 'Có chống nước không?'
  },
  en: {
    // Header & Navigation
    nav_status: 'Vitals Status',
    nav_sensor: 'Sensing',
    nav_portability: 'Portability',
    nav_specs: 'Specifications',
    nav_usecases: 'Use Cases',
    cta_now: 'ORDER NOW',

    // Hero Section
    hero_badge: 'HELIRING PRO • PREMIUM BIOMEDICAL WEARABLE',
    hero_title_1: 'HELIRING',
    hero_title_2: 'ACTIVE',
    hero_title_3: 'WELLNESS.',
    hero_desc: 'Next-generation smart health ring by HELICORP. Integrated micro medical-grade sensors to continuously track heart rate, SpO2, stress, and sleep quality with an aerospace-grade Titanium chassis.',
    hero_feat_ppg: '24/7 Biomedical PPG Sensing',
    hero_feat_material: 'Aerospace Titanium & IP68 Waterproof',
    hero_feat_temp: 'Skin Temp & Stress Tracking',
    hero_feat_battery: 'Micro-density battery lasts up to 7 days',
    hero_cta_guide: 'GET HEALTH PLAYBOOK',
    hero_cta_structure: 'Explore Sensor Architecture',
    hero_hud_recovery: 'RECOVERY',
    hero_hud_recovery_desc: 'Perfect recovery score',
    hero_hud_sleep: 'SLEEP INDEX',
    hero_hud_sleep_desc: 'Deep sleep matches clinical standards.',
    hero_hud_sensor: 'Biosensors',
    hero_scroll_down: 'Scroll to analyze vitals',

    // Problem Section (Thực Trạng)
    problem_badge: 'Modern Health Realities',
    problem_title_1: 'Do You Truly',
    problem_title_2: 'Know Your Vitals?',
    problem_desc: 'Modern life forces the body into chronic stress states that our basic senses cannot detect. Over 85% of early warning signs from heart rate and sleep are ignored, leading to sudden physical burnout.',
    problem_threat_label: 'Health Hazard',
    problem_threat_impact: 'Direct Impact',
    problem_scroll: 'Scroll to discover biomedical solutions from HELICORP',

    threat_1_title: 'Stress Overload & Burnout',
    threat_1_sub: 'Silent mental fatigue',
    threat_1_desc: 'High work intensity keeps the sympathetic nervous system on constant alert, accumulating Cortisol, which impairs memory, causes emotional imbalance, and drains energy.',
    threat_1_impact: 'Prolonged heart rate instability, reduced concentration, and creative block.',

    threat_2_title: 'Sleep Quality Crisis',
    threat_2_sub: 'Disrupted circadian rhythm',
    threat_2_desc: 'Blue light and mental pressure deplete Melatonin levels. Lacking Deep Sleep prevents brain cells from detoxifying and blocks muscle tissue repair.',
    threat_2_impact: 'Triggers premature aging, chronic high blood pressure, and persistent fatigue.',

    threat_3_title: 'Sedentary Lifestyle Syndrome',
    threat_3_sub: 'The silent killer',
    threat_3_desc: 'Sitting for over 6 hours daily slows down metabolism, decreases insulin sensitivity, and doubles the risk of severe cardiovascular conditions.',
    threat_3_impact: 'Reduces blood flow to the brain, causing visceral fat accumulation.',

    // TechShowcase Section (Giải Phẫu Công Nghệ)
    tech_badge: 'Master Craftsman Engineering',
    tech_title_1: 'Technology',
    tech_title_2: 'Biomedical Healing',
    tech_desc: 'A precise fusion of microscopic electronics, high-fidelity optical sensor grids, and ultra-durable Titanium, bringing an exceptionally comfortable wearing experience.',
    tech_instructions: '* Click modules to inspect engineering details',
    tech_cert_label_1: 'Standards',
    tech_cert_val_1: 'FDA Medical',
    tech_cert_label_2: 'Security',
    tech_cert_val_2: 'HIPAA Data',
    tech_cert_label_3: 'Waterproof',
    tech_cert_val_3: '50m IP68',

    layer_0_name: 'Dual-Frequency PPG Biosensor Matrix',
    layer_0_sub: 'Dual-PPG Matrix',
    layer_0_eff: '98.6% Clinical Accuracy',
    layer_0_desc: 'Integrates 4 dual-wavelength infrared and green photodiode arrays, continuously scanning fingertip capillaries to capture cardiac rhythms, HRV, and SpO2 in real-time.',

    layer_1_name: 'Clinical-Grade Thermistor Temperature Grid',
    layer_1_sub: 'Bio-Temp Sensor',
    layer_1_eff: '0.05°C Temperature Sensitivity',
    layer_1_desc: 'Continuously measures skin temperature on the finger to identify early signs of infections, ovulation cycles, or fever reactions before physical symptoms show.',

    layer_2_name: 'Highly-Integrated System-on-Chip (SoC)',
    layer_2_sub: 'Heli Cortex-M4',
    layer_2_eff: 'Ultra-low power consumption',
    layer_2_desc: 'The central core runs active motion-noise cancellation algorithms, ensuring biometric readouts remain flawless even during intense jogging or housework.',

    layer_3_name: 'Medical-Grade Titanium G5 Shell & Bio-Resin',
    layer_3_sub: 'Titanium G5 & Resin',
    layer_3_eff: '100% Hypoallergenic Guard',
    layer_3_desc: 'Ultra-tough external Titanium casing paired with non-toxic medical bio-resin on the inner layer provides total skin safety and comfort.',

    // Portability Section (Sự Êm Ái)
    port_badge: 'Minimalist Ergonomic Design',
    port_title_1: 'Thin & Light',
    port_title_2: 'As If Invisible',
    port_desc: 'Refined to the microscopic level, HeliRing Pro eliminates the bulk of traditional wrist-worn smartwatches, seamlessly tracking your health day and night.',
    port_hud_sys: 'SYSTEM STATUS',
    port_hud_conn: 'CONNECTED',
    port_hud_sync: 'REAL-TIME DATA SYNC',
    port_hud_bat: 'STANDARD POWER CELL',
    port_hud_bat_val: '7 DAYS',
    port_hud_bat_desc: 'Average battery lifespan',
    port_hud_sys_ok: 'Synced Successfully',

    feat_port_1_title: 'Ultra-Lightweight 2.8g',
    feat_port_1_desc: 'Only 2.5mm thin, lighter than a conventional coin, providing an invisible feel.',
    feat_port_2_title: 'Incredibly Thin 2.5mm',
    feat_port_2_desc: 'Integrated safe micro-density battery, keeping you company all week without daily charging worries.',
    feat_port_3_title: 'Seamless Flat-Surface Finish',
    feat_port_3_desc: 'Full sizes US 6 to 13. Receive a free sizing kit shipped directly to your home.',
    port_feat_1_lbl: 'ULTRA LIGHTWEIGHT',
    port_feat_1_val: '2.8g',
    port_feat_2_lbl: 'DURABLE ENERGY',
    port_feat_2_val: '7 Days',
    port_feat_3_lbl: 'VERSATILE CONVENIENCE',
    port_feat_3_val: '8 Sizes',

    // VitalsSimulator Section (Bản Thử Nghiệm Sinh Hiệu)
    sim_badge: 'Real-time vitals simulation',
    sim_title_1: 'Clinical Vitals',
    sim_title_2: 'Interactive Sandbox',
    sim_desc: 'Experience how HeliRing Pro continuously tracks, analyzes biometric values, and provides smart feedback based on real-world activity contexts.',
    sim_control: 'Status Control Dashboard',
    sim_choose: 'Choose Sandbox Mode',
    sim_mode_desc: 'Simulate daily scenarios to test the response of the dual-frequency PPG sensors on HeliRing Pro.',
    sim_ecg_btn: 'Trigger Electrocardiogram (ECG)',
    sim_ecg_btn_scanning: 'SCANNING ECG WAVE...',
    sim_ecg_result: 'CLINICAL ECG REPORT',
    sim_ecg_desc: 'Click the button above to start tracing your heart rhythm directly through the bio-sensor membrane.',
    sim_live_title: 'REAL-TIME TELEMETRY MONITOR',
    sim_live_desc: 'Digital feed from Cortex-M4 SoC (Latency < 15ms)',
    sim_hr_label: 'HEART RATE',
    sim_spo2_label: 'SPO2 BLOOD OXYGEN',
    sim_temp_label: 'TEMP',
    sim_hrv_label: 'HRV VARIABLE',
    sim_stress_label: 'STRESS INDEX',

    profile_resting_name: 'Resting / Sleep',
    profile_resting_lbl: 'Relaxed',
    profile_resting_status: 'Heart rate stabilized. Rest state minimizes cardiac workload.',
    profile_resting_desc: 'Parasympathetic nervous system dominates, promoting recovery and energy synthesis.',

    profile_workout_name: 'Workout / Cardio',
    profile_workout_lbl: 'High Intensity',
    profile_workout_status: 'Fat burning active. Heart contractility elevated for muscle oxygenation.',
    profile_workout_desc: 'Cardiovascular system runs at peak efficiency, enhancing circulation and stamina.',

    profile_stress_name: 'High Stress / Pressure',
    profile_stress_lbl: 'High Tension',
    profile_stress_status: 'Cortisol level spike detected. Box Breathing exercise is highly recommended.',
    profile_stress_desc: 'Sympathetic nervous system hyper-activated, mental cool-down needed.',

    profile_sleep_name: 'Deep REM Sleep',
    profile_sleep_lbl: 'Brain Recovery',
    profile_sleep_status: 'Brain cells clearing toxic waste, full-scale muscle fiber repair in progress.',
    profile_sleep_desc: 'Optimal deep sleep stage to consolidate memory and reinforce immune functions.',

    diag_resting: 'ECG normal. Rhythms are regular with sinus pattern; no arrhythmias detected.',
    diag_workout: 'Physiological tachycardia due to physical exertion. Excellent cardiovascular adaptation.',
    diag_stress: 'Mild irregular heartbeat pattern detected (low HRV). 4-7-8 breathing suggested to reduce stress.',
    diag_sleep: 'Physiological bradycardia during deep sleep. Autonomic recovery index at maximum potential.',

    // Specs Section (Bảng Thông Số)
    specs_badge: 'Product Technical Data',
    specs_title_1: 'Specifications',
    specs_title_2: 'Mechanical & Biological',
    specs_desc: 'HeliRing Pro boasts exceptional engineering stats, validating HELICORP\'s precision mechanics.',
    specs_label: 'Parameter',

    spec_1_title: 'Chassis Alloy',
    spec_1_sub: 'Outer Shell',
    spec_1_val: 'Grade 5 Titanium',
    spec_1_desc: '4x tougher than stainless steel, ultra-lightweight, outstanding scratch resistance.',

    spec_2_title: 'Waterproof Standards',
    spec_2_sub: 'System Seal',
    spec_2_val: '5ATM / IP68',
    spec_2_desc: 'Safe for heavy rain, hand washing, swimming, or shallow diving down to 50m.',

    spec_3_title: 'Charging Duration',
    spec_3_sub: 'Energy Cell',
    spec_3_val: '45 Mins Full',
    spec_3_desc: 'Up to 7 days of continuous usage powered by micro Lithium-Polymer cells.',

    spec_4_title: 'Wireless Protocol',
    spec_4_sub: 'Sync Protocol',
    spec_4_val: 'Bluetooth Low Energy',
    spec_4_desc: 'Next-gen BLE optimizes battery, enabling super-fast and secure data synchronization.',

    spec_5_title: 'Ring Profile Thickness',
    spec_5_sub: 'Dimensions',
    spec_5_val: '2.5 mm',
    spec_5_desc: 'Exceptional thinness wraps comfortably around your finger with no bulk.',

    spec_6_title: 'Microprocessor Unit',
    spec_6_sub: 'Processing',
    spec_6_val: 'Cortex-M4 SoC',
    spec_6_desc: 'Biomedical DSP chip with built-in real-time motion-noise cancellation filters.',

    // UseCases Section (Đồng hành cùng bạn)
    cases_badge: 'Real-Life Applications',
    cases_title_1: 'Companion for You',
    cases_title_2: 'Every Step of the Way',
    cases_desc: 'HeliRing Pro runs silently, turning complex vitals into clear, actionable health insights.',
    cases_metric_label: 'SENSOR METRIC',

    case_1_title: 'Office Productivity & Stress Guard',
    case_1_sub: 'Peak Focus Mode',
    case_1_desc: 'Under high stress, HeliRing Pro detects rapid pulse & low HRV, recommending Box Breathing via the app to restore sympathetic balance.',
    case_1_val: 'Stress Detected < 5s',

    case_2_title: 'Auto Workout & Physical Endurance',
    case_2_sub: 'Fitness Recovery',
    case_2_desc: 'Automatically tracks activities: running, cycling, swimming, and gym. Measures peak heart rate and calculates exact calories burnt.',
    case_2_val: 'Waterproof 50 meters',

    case_3_title: 'Circadian Sleep & Recovery Review',
    case_3_sub: 'Circadian Rhythm Sync',
    case_3_desc: 'Tracks respiratory rate, SpO2, and skin temperature. You will understand precisely why you wake up feeling tired or fully energized.',
    case_3_val: 'Precise REM Tracking',

    // CTA Section
    cta_badge: 'Exclusive Privilege Opportunity',
    cta_title_1: 'Get Health Guide &',
    cta_title_2: '25% Pre-Order Discount',
    cta_desc: 'Be the first to own the groundbreaking health tracking wearable from HELICORP and receive clinical health science updates.',
    cta_benefits_title: 'Registration benefits:',
    cta_benefit_1: 'Free E-Book: Clinical Biomedical Healing Guide',
    cta_benefit_2: 'Exclusive 25% discount code for early orders',
    cta_benefit_3: 'Early beta access to new HeliHealth app features',
    cta_benefit_4: '12-month official manufacturer swap warranty',
    cta_form_email_placeholder: 'Enter your email address...',
    cta_form_btn: 'Unlock My Discount',
    cta_form_sending: 'REGISTERING...',
    cta_form_success_title: 'Registration successful! 🎉',
    cta_form_success_desc: 'We registered your email. Check your inbox for updates soon!',
    cta_form_error_title: 'An error occurred!',
    cta_form_error_desc: 'Could not submit your email. Please try again later.',

    // Footer
    footer_desc: 'Pioneering minimalist biomedical wearable devices, empowering you to master your vitals second by second.',
    footer_copyright: '© 2026 HELICORP Co., Ltd. All rights reserved.',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',

    // Chatbot
    chat_greeting: 'Hello! I am HeliCorp\'s AI assistant. How can I help you regarding the HeliRing Pro smart health ring?',
    chat_online: 'Online • Response instantly',
    chat_placeholder: 'Ask about battery life, material...',
    chat_quick_1: 'How much does the ring weigh?',
    chat_quick_2: 'How long does the battery last?',
    chat_quick_3: 'What material is the ring made of?',
    chat_quick_4: 'Is it waterproof?'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'vi' || saved === 'en') ? saved : 'vi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const dict = translations[language] as Record<string, string>;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
