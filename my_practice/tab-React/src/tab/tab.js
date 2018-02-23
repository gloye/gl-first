import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Tabs extends Component {
    static propTypes = {

    }
    static defaultProps = {
        classPrefix: 'tabs',
        onChange: () => { }
    }

    constructor(props) {
        super(props)
        this.handleTabClick = this.handleTabClick.bind(this)
        const currProps = this.props
        let activeIndex
        if('activeIndex' in currProps){
            activeIndex = currProps.activeIndex
        } else if('defaultActiveIndex' in currProps){
            activeIndex = currProps.defaultActiveIndex
        }
        this.state = {
            activeIndex,
            prevIndex:activeIndex,
        }
    }  
    componentWillReceiveProps = (nextProps) => {
      if('activeIndex' in nextProps){
          this.setState({
              activeIndex: nextProps.activeIndex  
          })
      }
    }
    handleTabClick(activeIndex){
        const prevIndex = this.state.activIndex
        if(this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props){
            this.setState({
                activeIndex,
                prevIndex
            })
            this.props.onChange({
                activeIndex,prevIndex
            })
        }
    }
    renderTabNav(){
        const {classPrefix,children} = this.props
        return(
            <TabNav
                key = 'tabBar'
                classPrefix = {classPrefix}
                onTabClick = {this.handleTabClick}
                panels = {children}
                activeIndex = {this.state.activeIndex}
                />
        )
    }
    renderTabContent(){
        const {classPrefix,children} = this.props
        return(
            <TabContent
                key = 'tabcontent'   
                classPrefix = {classPrefix}
                panels = {children}
                activeIndex = {this.state.activeIndex}
            />)
    }
    render(){
        const {className} = this.props
        const classes = classnames(className,'ui-tabs')
        return(
            <div className = {classes}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        )
    }

}