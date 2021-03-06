import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Head from 'components/Head'
import Nav from 'components/Nav'
import TaskForm from 'components/TaskForm'
import TaskList from 'components/TaskList'
import TaskStats from 'components/TaskStats'
import selector from '../selector'
import { fetchTaskList, taskAdd, taskDone, taskUndone, taskRemove, taskEdit, taskFilter } from 'actions'

class App extends Component {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
    taskCount: PropTypes.number.isRequired,
    doneTaskCount: PropTypes.number.isRequired,
    filters: PropTypes.string.isRequired,
    // onFetchTaskList: PropTypes.func.isRequired,
    onTaskAdd: PropTypes.func.isRequired,
    onTaskDone: PropTypes.func.isRequired,
    onTaskUndone: PropTypes.func.isRequired,
    onTaskRemove: PropTypes.func.isRequired,
    onTaskEdit: PropTypes.func.isRequired,
    onTaskFilter: PropTypes.func.isRequired,
  }

  static async getInitialProps({ store, query }) {
    await store.dispatch(fetchTaskList())
  }

  // componentDidMount () {
  //   const { onFetchTaskList } = this.props
  //   onFetchTaskList()
  // }

  render () {
    const { tasks, taskCount, doneTaskCount, filters,
            onTaskAdd, onTaskDone, onTaskUndone, onTaskRemove, onTaskEdit, onTaskFilter,
          } = this.props

    const taskListProps = {
      tasks,
      onTaskEdit,
      onTaskDone,
      onTaskUndone,
      onTaskRemove,
    }

    const taskStatsProps = {
      filters,
      taskCount,
      doneTaskCount,
      onTaskFilter,
    }

    return (
      <div className="viewport">
        <Head title="home" />
        <Nav />
        <TaskForm onSave={onTaskAdd} />
        <TaskList {...taskListProps} />
        <TaskStats {...taskStatsProps} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  // onFetchTaskList: bindActionCreators(fetchTaskList, dispatch),
  onTaskAdd: bindActionCreators(taskAdd, dispatch),
  onTaskDone: bindActionCreators(taskDone, dispatch),
  onTaskUndone: bindActionCreators(taskUndone, dispatch),
  onTaskRemove: bindActionCreators(taskRemove, dispatch),
  onTaskEdit: bindActionCreators(taskEdit, dispatch),
  onTaskFilter: bindActionCreators(taskFilter, dispatch),
})

export default connect(selector, mapDispatchToProps)(App)
