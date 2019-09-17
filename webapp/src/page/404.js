import React from 'react';
import {Link} from 'react-router-dom';
function Page404(){
    return(
        <div className="page notfound">
            <h1>404</h1>
            <p>Không tồn tại trang này!</p>
            Quay trở về <Link to="/">trang chủ</Link>.
        </div>
    )
}
export default Page404;