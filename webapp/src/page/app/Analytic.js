import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Bubble } from 'react-chartjs-2';
class Analytic extends React.Component {
    render() {
        const chartData = { "datasets": [{ "label": "Cương vực", "data": [{ "x": 65, "y": 2, "r": 116 }], "backgroundColor": "#2a9e6e" }, { "label": "Địa lý, địa chất", "data": [{ "x": 56, "y": 4, "r": 1 }], "backgroundColor": "#4f1d4e" }, { "label": "Động vật, thực vật", "data": [{ "x": 118, "y": 2, "r": 138 }], "backgroundColor": "#848553" }, { "label": "Tộc người", "data": [{ "x": 77, "y": 11, "r": 1 }], "backgroundColor": "#229829" }, { "label": "Dân cư", "data": [{ "x": 58, "y": 9, "r": 1 }], "backgroundColor": "#8ea3d5" }, { "label": "Chính trị", "data": [{ "x": 78, "y": 2, "r": 149 }], "backgroundColor": "#f64c4f" }, { "label": "Hành chính", "data": [{ "x": 110, "y": 21, "r": 1 }], "backgroundColor": "#129e68" }, { "label": "Pháp luật", "data": [{ "x": 52, "y": 2, "r": 73 }], "backgroundColor": "#fab8f9" }, { "label": "Quốc phòng", "data": [{ "x": 73, "y": 11, "r": 1 }], "backgroundColor": "#a579c7" }, { "label": "An ninh", "data": [{ "x": 111, "y": 17, "r": 1 }], "backgroundColor": "#d43460" }, { "label": "Ngoại giao", "data": [{ "x": 90, "y": 23, "r": 115 }], "backgroundColor": "#d3b4a7" }, { "label": "Kinh tế", "data": [{ "x": 108, "y": 2, "r": 134 }], "backgroundColor": "#2f7b29" }, { "label": "Lịch sử", "data": [{ "x": 55, "y": 2, "r": 109 }], "backgroundColor": "#964564" }, { "label": "Văn hóa", "data": [{ "x": 112, "y": 2, "r": 189 }], "backgroundColor": "#b2d5bd" }, { "label": "Văn học", "data": [{ "x": 60, "y": 2, "r": 178 }], "backgroundColor": "#6315f3" }, { "label": "Nghệ thuật", "data": [{ "x": 112, "y": 22, "r": 128 }], "backgroundColor": "#dae767" }, { "label": "Ngôn ngữ, chữ viết", "data": [{ "x": 46, "y": 2, "r": 35 }], "backgroundColor": "#eab217" }, { "label": "Văn tịch", "data": [{ "x": 43, "y": 2, "r": 67 }], "backgroundColor": "#10912e" }, { "label": "Tư tưởng", "data": [{ "x": 55, "y": 2, "r": 76 }], "backgroundColor": "#85e28c" }, { "label": "Tôn giáo, tín ngưỡng", "data": [{ "x": 56, "y": 7, "r": 63 }], "backgroundColor": "#fec5b3" }, { "label": "Giáo dục", "data": [{ "x": 77, "y": 2, "r": 103 }], "backgroundColor": "#bd7136" }, { "label": "Khoa học - Công nghệ", "data": [{ "x": 80, "y": 18, "r": 90 }], "backgroundColor": "#6f2c91" }, { "label": "Y, Dược", "data": [{ "x": 95, "y": 22, "r": 99 }], "backgroundColor": "#2d52d2" }, { "label": "Giao thông vận tải", "data": [{ "x": 102, "y": 21, "r": 109 }], "backgroundColor": "#9d57ed" }, { "label": "Truyền thông", "data": [{ "x": 83, "y": 13, "r": 94 }], "backgroundColor": "#adecf0" }, { "label": "Xã hội", "data": [{ "x": 100, "y": 22, "r": 128 }], "backgroundColor": "#ffcdfa" }, { "label": "Tạp loại", "data": [{ "x": 94, "y": 17, "r": 105 }], "backgroundColor": "#6badfa" }, { "label": "Tổng chí", "data": [{ "x": 66, "y": 6, "r": 68 }], "backgroundColor": "#a9ca03" }, { "label": "Địa phương chí (Tỉnh chí)", "data": [{ "x": 64, "y": 12, "r": 71 }], "backgroundColor": "#21053d" }] };
        return (
            <div>
                <div className="qc-content qc-analytic-acc">
                    <Row>
                        <Col md={4}>
                            <Container fluid className="qc-card qc-welcome">
                                <h2>Chào mừng</h2>
                                Trần Mạnh Cường,
                                    <p>
                                    Bạn đã soạn <b>5 bài viết</b>
                                    <br />Bạn đang soạn dở <b>2  bài viết</b>
                                    <br />Bạn được đánh giá tại <b> 2 bài viết</b>
                                </p>
                            </Container>
                        </Col>
                        <Col md={8}>
                            <Container fluid className="qc-card">
                                <h2>Cập nhật mới nhất</h2>
                                <ul>
                                    <li>Thảo mộc Việt Nam - <i>Nguyễn Đình Đắc</i></li>
                                    <li>Mộc bản Triều Nguyễn - <i>Trần Việt Trung</i></li>
                                    <li>Chiến dịch Chiến tranh cục bộ: Mùa khô thứ nhất 1965- 1966 - <i>Nguyễn Thị Huyền Trang</i></li>
                                    <li>Cách mạng công nghiệp 4.0 và xu hướng toàn đầu hóa - <i>Nguyễn Đức</i></li>
                                    <li>Giải pháp tầm nhìn kinh tế 2020 - <i>Cao Văn Đình</i></li>
                                </ul>
                            </Container>
                        </Col>
                    </Row>
                </div>

                <div className="qc-content">
                    <div className="qc-card">
                        <div className="qc-card-header">
                            Biểu đồ quy mô và số lượng theo tập
              </div>
                        <div className="card-body">
                            <Bubble options={{
                                scales: {
                                    yAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Số mục hoàn thành'
                                        }
                                    }],
                                    xAxes: [{
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Số tư liệu'
                                        }
                                    }]
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem, data) {
                                            var dataset = data.datasets[tooltipItem.datasetIndex];

                                            return dataset.label + ': (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')'
                                        },
                                        afterLabel: function (tooltipItem, data) {
                                            var dataset = data.datasets[tooltipItem.datasetIndex];
                                            var r = dataset.data[0].r;

                                            return 'Số biên tập viên: ' + r;
                                        }
                                    }
                                }
                            }} data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Analytic;
