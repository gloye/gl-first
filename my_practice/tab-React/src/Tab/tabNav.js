import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TabNav extends Component {
    static propTypes = {
        classPrefix: React.propTypes.string,
        panels: PropTypes.node,
        activeIndex:PropTypes.number
    } 
    getTabs(){
        const{panels,classPrefix,activeIndex} = this.props
        return React.Children.map(panels,(child)=>{
            if(!child) {return}
            const order = parseInt(child.props.order,10)
            // 利用class控制显示和隐藏
            let classes = classnames({
                
            })
        })
    }
}