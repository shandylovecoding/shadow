import React from 'react'
import { connect } from 'react-redux'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Button, Form, Label, Input } from 'reactstrap';
import classes from './createquizcardQuestion.module.css'

class PureCreateQuiz extends React.Component{
    constructor(props){
        super(props)
        this.state={
            questionType: 'multipleChoice',
            questionBody: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            a: "",
            b: "",
            c: "",
            d: "",
            questionTime: "",
            viewing: "",
            creating: true,
        }
    }
    displayQuestion(e, i){
        // e.preventDefault()
        this.setState({
            viewing: i,
            questionType: this.props.questions[i].questionType,
            questionBody: this.props.questions[i].questionBody,
            multipleChoiceAnswer: this.props.questions[i].multipleChoiceAnswer,
            trueFalseAnswer: this.props.questions[i].trueFalseAnswer,
            a: this.props.questions[i].a,
            b: this.props.questions[i].b,
            c: this.props.questions[i].c,
            d: this.props.questions[i].d,
            questionTime:this.props.questions[i].questionTime,
        })
    }

    mcToggle(){
        this.setState({
            questionType: 'multipleChoice',
            questionBody: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            a: "",
            b: "",
            c: "",
            d: "",
        })
    }
    tfToggle(){
        this.setState({
            questionType: 'trueFalse',
            questionBody: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            a: "",
            b: "",
            c: "",
            d: "",
        })
    }
    changeOpt(e){
        if(e.target.attributes["id"].value === "a"){
            this.setState({
                a: e.currentTarget.value
            })
        } else if (e.target.attributes["id"].value === "b"){
            this.setState({
                b: e.currentTarget.value
            })
        } else if (e.target.attributes["id"].value === "c"){
            this.setState({
                c: e.currentTarget.value
            })
        } else if (e.target.attributes["id"].value === "d"){
            this.setState({
                d: e.currentTarget.value
            })
        } else if(e.target.attributes["id"].value === "question"){
            this.setState({
                questionBody: e.currentTarget.value
            })
        }
    }
    selectAns(e){
        if(this.state.questionType === "multipleChoice"){
            this.setState({
                multipleChoiceAnswer: e.target.attributes["id"].value
            })
        } else {
            this.setState({
                trueFalseAnswer: e.target.attributes["id"].value
            })
        }
    }
    checkFinished(e){
        e.preventDefault()
        if(this.state.questionType === 'multipleChoice' && this.state.questionBody !== "" && this.state.multipleChoiceAnswer !== ""){
            this.props.submit(e, this.state)
            // this.clear()
        } else if (this.state.questionType === 'trueFalse' && this.state.questionBody !== "" && this.state.trueFalseAnswer !== ""){
            this.props.submit(e, this.state)
            // this.clear()
        } else {
            alert("please fill in the required boxes")
        }
    }
    getTime(){
        this.setState({
            questionTime: Math.floor(document.getElementById("preview").currentTime)
        })
    }
    clear(){
        this.setState({            
            questionBody: "",
            a: "",
            b: "",
            c: "",
            d: "",
            multipleChoiceAnswer: "",
            trueFalseAnswer: "",
            questionTime: "",
            viewing: ""
        })
    }

    viewing(e, i){
        this.setState({
            viewing: i,
            creating: false,
        })
    }

    creating(){
        this.setState({
            creating: true,
            viewing: ""
        })
    }

    render(){

        return (
            <>
            <div className={classes.viewquizcardquestion}></div>
            <Form>
            <div className={classes.questionframe}>
                <div className="row">
                    <div className="col col-8">
                        <p>Question {this.state.viewing !== "" ? this.state.viewing + 1  : this.props.questions.length + 1}</p>
                        <p>{this.state.time}</p>
                    </div>
                    <div className="col col-4">
                        <div className={classes.questiontype}>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Question type
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem onClick={()=>this.mcToggle()}>Multiple Choice</DropdownItem>
                            <DropdownItem onClick={()=>this.tfToggle()}>True or False</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12">
                    <textarea id="question" placeholder="Input a question (required)" value={this.state.questionBody} className={classes.question} onChange={(e)=> this.changeOpt(e)} />
                    </div>
                </div>

                {this.state.questionType === "multipleChoice" ? 
                <div>
                    <div className="row">
                    <table>
                        <thead> 
                            <tr>
                                <th>Please click to choose the correct answer </th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr className={classes.questionrow}>
                                {/* <FormGroup> */}
                                        <th className={classes.opt}>
                                            <Label for="a">
                                                <Button id="a" className="input" onClick={(e)=>this.selectAns(e)}
                                                style={{
                                                    background: 
                                                    this.state.multipleChoiceAnswer === "a" 
                                                            ? "#3b3d2f" : null, 
                                                    border: this.state.multipleChoiceAnswer === "a" 
                                                    ? "1px solid #3b3d2f" : null}} >A</Button>
                                            </Label>
                                        </th>

                                        <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="a" id="a" value={this.state.a} />
                                        </td>
                                    {/* </FormGroup> */}

                                    {/* <FormGroup> */}
                                    <th className={classes.opt}>
                                        <Label for="b">
                                            <Button id="b" className="input" onClick={(e)=>this.selectAns(e)}
                                            style={{
                                                    background: 
                                                    this.state.multipleChoiceAnswer === "b" 
                                                            ? "#3b3d2f" : null, 
                                                    border: this.state.multipleChoiceAnswer === "b" 
                                                    ? "1px solid #3b3d2f" : null}} >B</Button></Label>
                                    </th>

                                    <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="b" id="b" value={this.state.b} />
                                    </td>
                                    {/* </FormGroup> */}
                        </tr>
                        <tr className={classes.questionrow}>
                                    {/* <FormGroup> */}
                                    <th className={classes.opt}>
                                        <Label for="c">
                                            <Button id="c" className="input" onClick={(e)=>this.selectAns(e)}
                                            style={{
                                                background: 
                                                this.state.multipleChoiceAnswer === "c" 
                                                        ? "#3b3d2f" : null, 
                                                border: this.state.multipleChoiceAnswer === "c" 
                                                ? "1px solid #3b3d2f" : null}} >C</Button></Label>
                                    </th>

                                    <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="c" id="c" value={this.state.c} />
                                    </td>
                                    {/* </FormGroup> */}

                                    {/* <FormGroup> */}
                                    <th className={classes.opt}>
                                        <Label for="d">
                                            <Button id="d" className="input" onClick={(e)=>this.selectAns(e)}
                                            style={{
                                                background: 
                                                this.state.multipleChoiceAnswer === "d" 
                                                        ? "#3b3d2f" : null, 
                                                border: this.state.multipleChoiceAnswer === "d" 
                                                ? "1px solid #3b3d2f" : null}} >D</Button></Label>
                                    </th>
                                        
                                    <td className={classes.ans}>
                                        <Input onChange={(e) => this.changeOpt(e)} type="text" name="d" id="d" value={this.state.d} />
                                    </td>

                                    {/* </FormGroup> */}
                        </tr>
                        </tbody>

                    </table>
                    </div>
                </div> : 
                <div>
                    <div className="row">
                    <table>
                    <tbody>
                        <tr className={classes.questionrow}>
                                    <th className={classes.tfopt}>
                                        <Button onClick={(e)=>this.selectAns(e)} id="true"
                                        style={{
                                            background: 
                                            this.state.trueFalseAnswer === "true" 
                                                    ? "#3b3d2f" : null, 
                                            border: this.state.trueFalseAnswer === "true" 
                                            ? "1px solid #3b3d2f" : null}}
                                            > True </Button>
                                    </th>

                                    <th className={classes.tfopt}>
                                        <Button onClick={(e)=>this.selectAns(e)} id="false"
                                        style={{
                                            background: 
                                            this.state.trueFalseAnswer === "false" 
                                                    ? "#3b3d2f" : null, 
                                            border: this.state.trueFalseAnswer === "false" 
                                            ? "1px solid #3b3d2f" : null}}
                                            > False </Button>
                                    </th>
                                        
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            }
            { this.state.edit ? <button className="btn btn-primary" onClick={(e)=>{this.props.edit(e, this.state); this.clear()}}>Save Question</button> : null}
            </div>
            </Form>
            <div className={classes.scrollicon}>
                <span onClick={(e)=>{
                    if (this.state.creating) {
                        this.props.submit(e,this.state); this.clear()
                    }  else {
                        this.clear();
                        this.creating() 
                    }}}>+</span>
                {this.props.questions && this.props.questions.length > 0 ? this.props.questions.map((question, i)=>{
                    return (
                            <span onClick={(e) => {this.displayQuestion(e, i) ; this.viewing(e, i)}} key={i} 
                            style={{ 
                                background: this.state.viewing === i ? "#F6CA4E" : null, 
                                color: this.state.viewing === i ? "#FFFFFF" : null}}>{i + 1}</span>

                    )
                }) : null}
            </div>

            </>
        )
    }
}

export const CreatequizcardQuestion = connect(null, null)(PureCreateQuiz)
