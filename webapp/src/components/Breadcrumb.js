import React from 'react';
import { Link } from 'react-router-dom';
class Breadcrumb extends React.Component {
    render() {
        var pathold = null;
        var renderPath = this.props.data.map(element => {
            if (pathold == null) {
                pathold = element.path;
            } else {
                pathold = pathold + element.path;
            }
            if (element.name == null) return;
            return <span> - <Link to={pathold+"/"}>{element.name}</Link></span>;
        });
        return (
            <span>
                {renderPath}
            </span>
        )
    }
}
export default Breadcrumb;