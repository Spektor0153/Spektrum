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
import {faCloudUploadAlt, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const imageIsRequired = value => (!value ? "Required" : undefined);
const required = value => value ? undefined : 'Обязательно для заполнения'
const maxLength = max => value =>  value && value.length > max ? `Не более ${max} символов` : undefined
const maxLength10 = maxLength(10)

const minLength = min => value =>  value && value.length < min ? `Не менее ${min} символов` : undefined
const minLength3 = minLength(3)

const badCharArr = [`'`,`"`,`/`,`$`,`@`,`!`,`-`,"\\",`#`,`?`,`%`,`.`,`,`];
const badChar = value => value ? badCharArr.reduce( (acc, char)=> value.indexOf(char)!=-1 ? `Недопустимые символы ` : acc , undefined)  : undefined




class UploadImageForm extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = { imageFile: []};
        //const [value, setValue] = useState(new Date());
    }

    handleFormSubmit = formProps => {
        const fd = new FormData();
        fd.append("imageFile", formProps.imageToUpload.file);
        fd.append("surname", formProps.surname);
        fd.append("name", formProps.name);
        fd.append("login", formProps.login);
        fd.append("password", formProps.password);
        if (formProps.year&&formProps.month&&formProps.day) {
            fd.append("year", formProps.year);
            fd.append("month", formProps.month);
            fd.append("day", formProps.day);
        }
        if (formProps.school) {
            fd.append("school", formProps.school)

        }
        if (formProps.about) {
            fd.append("about", formProps.about)
        }


        console.log(formProps)
        console.log(fd)
        this.props.registrationThunk(fd)
       // alert(JSON.stringify(formProps, null, 4));
    };

    handleOnDrop = (newImageFile, onChange) => {
        const imageFile = {
            file: newImageFile[0],
            name: newImageFile[0].name,
            preview: URL.createObjectURL(newImageFile[0]),
            size: newImageFile[0].size
        };

        this.setState({ imageFile: [imageFile] }, () => onChange(imageFile));
    };

    resetForm = () => this.setState({ imageFile: [] }, () => this.props.reset());

    render() {

        return (

            <div className={styles.appContainer}>
                <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)} enctype="multipart/form-data">
                    <Container>
                        <Row>
                            <Col md={5}>
                                <div className="form-group">
                                    <Field component="input" type="text" className="form-control" name="login"  label="Логин"  component={renderField}   validate={[ required, maxLength10, badChar ]} />
                                </div>
                                <div className="form-group">
                                    <Field component="input" type="password"  className="form-control" name="password" label="Пароль"  component={renderField}  validate={[ required, maxLength10, badChar ]}  />
                                </div>
                                <div className="form-group">
                                    <Field component="input" type="text"  className="form-control" name="surname"  label="Фамилия"  component={renderField}  validate={[required, badChar, minLength3, maxLength10]} />
                                </div>
                                <div className="form-group">
                                    <Field component="input" type="text"  className="form-control" name="name"  label="Имя"  component={renderField} validate={[required, badChar, minLength3, maxLength10]} />
                                </div>


                                <div className="form-group">
                                    <label className={styles.label}>Дата рождения:</label>
                                    <Row>
                                        <Col md='3'>
                                            <Field component="select" className="form-control" name='day'>
                                                {
                                                    [...Array(31)].map((el,i) =>31-i ).map(el=><option value={el}>{el}</option>)
                                                }
                                            </Field>
                                        </Col>

                                        <Col md='5'>
                                            <Field component="select" className="form-control" name='month'>
                                                <option value={1}>января</option>
                                                <option value={2}>февраля</option>
                                                <option value={3}>марта</option>
                                                <option value={4}>апреля</option>
                                                <option value={5}>мая</option>
                                                <option value={6}>июня</option>
                                                <option value={7}>июля</option>
                                                <option value={8}>августа</option>
                                                <option value={9}>сентября</option>
                                                <option value={10}>октября</option>
                                                <option value={11}>ноября</option>
                                                <option value={12}>декабя</option>
                                            </Field>
                                        </Col>
                                        <Col md='4'>
                                            <Field component="select" className="form-control" name='year'>
                                                {
                                                    [...Array(70)].map((el,i) =>2015-i ).map(el=><option value={el}>{el}</option>)
                                                }
                                            </Field>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={{ span: 6, offset: 1 }}>
                                <div className="form-group">
                                    <label className={styles.label}>Фотография профиля:</label>
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

                                </div>
                                <div className="form-group">
                                    <Field component="input" type="text"  className="form-control" name="school"  label="Место работы" validate={badChar} component={renderField}/>
                                </div>
                                <div className="form-group">
                                    <Field component="input" type="text"  className="form-control" name="about" label="О себе" validate={badChar}  component={renderField}/>

                                </div>

                            </Col>
                            <Col md='12'>
                                <hr/>
                                <div className={styles.sendCol}>
                                    <Button className={styles.sendButton} variant="dark" type="submit" disabled={this.props.submitting}>Зарегистрироваться</Button>
                                </div>
                            </Col>
                        </Row>

                    </Container>



                </Form>
                <div className="clear"/>
            </div>
        )
    }
}


const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <FormBootstrap.Control autoComplete="off"  className={`${error && touched ? styles.hasError : ""}`} {...input} placeholder={label} type={type}/>
            {touched && ((error && <div className={styles.error}>{error}</div>) || (warning && <div className={styles.error}>{warning}</div>))}
        </div>
    </div>
)



export default reduxForm({ form: "UploadImageForm" })(UploadImageForm);
