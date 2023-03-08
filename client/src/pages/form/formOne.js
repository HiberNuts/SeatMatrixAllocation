import React from "react";
import { Row, Col, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Component";
import classNames from "classnames";
import { RSelect } from "../../components/Component";

const FormOne = ({ alter, id }) => {
  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (e) => { };
  const formClass = classNames({
    "form-validate": true,
    "is-alter": alter,
  });

  const defaultOptions = [
    { value: "GOVT", label: "Government College" },
    { value: "SF", label: "Self Financed" },
    { value: "MIN", label: "Minority" },
  ];
  return (
    <React.Fragment>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
            <div className="form-group">
              <Label className="form-label" htmlFor="fv-full-name">
                College Name
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-full-name"
                  name="CollegeName"
                  className="form-control"
                />
                {errors.CollegeName && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <Label className="form-label" htmlFor="fv-email">
                Email address
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="fv-email"
                  name="email"
                  className="form-control"
                />
                {errors.email && errors.email.type === "required" && <span className="invalid">This is required</span>}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="invalid">{errors.email.message}</span>
                )}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <Label className="form-label" htmlFor="fv-subject">
                Principal Name
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="fv-subject"
                  name="principalName"
                  className="form-control"
                />
                {errors.principalName && <span className="invalid">This field is required</span>}
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <Label className="form-label" htmlFor="fv-topics">
                College Type
              </Label>
              <RSelect options={defaultOptions} />

            </div>
          </Col>
          <Col md="12">
            <div className="form-group">
              <Button color="primary" size="lg">
                Next Section
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};
export default FormOne;
