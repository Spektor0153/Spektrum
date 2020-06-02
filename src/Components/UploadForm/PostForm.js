import React, {Component, useState} from "react";
import DropZoneField from "./DropZoneField/DropZoneField";
import { Form, Field, reduxForm } from "redux-form";
import FormBootstrap from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./formUpload.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const imageIsRequired = value => (!value ? "Required" : undefined);
const required = value => value ? undefined : 'Обязательно для заполнения'


const badCharArr = [`'`,`"`,`/`,`$`,`@`,`!`,`-`,"\\",`#`,`?`,`%`,`.`,`,`];
const badChar = value => value ? badCharArr.reduce( (acc, char)=> value.indexOf(char)!=-1 ? `Недопустимые символы ` : acc , undefined)  : undefined


class PostForm extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = { imageFile: [], showImgUploader: false};
        //const [value, setValue] = useState(new Date());
    }

    handleFormSubmit = formProps => {
        const fd = new FormData();
        console.log(formProps)
        if (formProps.imageToUpload) {
            fd.append("imageFile", formProps.imageToUpload.file);
        }
        fd.append("post", formProps.post);

        console.log(fd)
        this.props.sendPostThunk(fd);
        this.resetForm()
        // alert(JSON.stringify(formProps, null, 4));
    };
    onToogleImageUpload = () => {
        console.log('onToogleImageUpload')
        console.log(this.state)
        this.setState({ showImgUploader: !this.state.showImgUploader});
    }
    handleOnDrop = (newImageFile, onChange) => {
        const imageFile = {
            file: newImageFile[0],
            name: newImageFile[0].name,
            preview: URL.createObjectURL(newImageFile[0]),
            size: newImageFile[0].size
        };

        this.setState({ imageFile: [imageFile] }, () => onChange(imageFile));
    };

    resetForm = () => this.setState({ imageFile: [], showImgUploader: false }, () => this.props.reset());

    render() {
        return (

            <div>
                <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} >
                    <Row className={styles.rowPosts}>

                        <Col md="12">
                            <div className={styles.flexBlock_post}>
                                <div className={styles.imgRound} style={{backgroundImage: `url(${this.props.profileImg})`}}></div>
                                <Field component="input" type="text" className={styles.inputMessage} name="post"  label="Что у вас нового?"   component={renderField}   validate={[ required, badChar ]} />
                                <FontAwesomeIcon className={styles.photoAddIcon} onClick={this.onToogleImageUpload} icon={faCamera}></FontAwesomeIcon>
                                <Button className={styles.sendPostButton} variant="dark" type="submit" disabled={this.props.submitting}>Опубликовать</Button>
                            </div>

                        </Col>
                    </Row>
                    {this.state.showImgUploader==true?


                    <Row>
                        <Col  md={12}>
                            <div className={styles.relative}>
                                <Field
                                    name="imageToUpload"
                                    component={DropZoneField}
                                    type="file"
                                    imagefile={this.state.imageFile}
                                    handleOnDrop={this.handleOnDrop}
                                    validate={[imageIsRequired]}
                                />
                                {!(this.props.pristine || this.props.submitting)?
                                    <FontAwesomeIcon className={styles.closeIcon} onClick={this.resetForm} icon={faTimesCircle}></FontAwesomeIcon>
                                    :''
                                }
                            </div>
                        </Col>
                    </Row>
                    :''
                    }

                </Form>


            </div>
        )
    }
}


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
        <div className={styles.flexInput}>
            <FormBootstrap.Control autoComplete="off" className={`${styles.inputMessage} ${error && touched ? styles.hasError : ""}`} {...input} placeholder={label} type={type}/>
            {touched &&
            ((error && <div className={styles.error}>{error}</div>) || (warning && <div className={styles.error}>{warning}</div>))
            }
        </div>
)



export default reduxForm({ form: "PostForm" })(PostForm);
