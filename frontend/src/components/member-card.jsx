import { useState } from "react";

function MemberCard(props) {
  if (props.user_type === "Employee") {
    return (
      <div
        className="team-member"
        key={"member-" + props.member.pk}
        id={"team-member-" + props.member.pk}
        data-username={props.member.fields.username}
        onClick={props.openMemberForm}
      >
        <span className="username">{props.member.fields.username}</span>
        <br />
        {props.member.fields.email}
      </div>
    );
  }

  if (props.user_type === "Manager") {
    return (
      <div
        className="team-member manager"
        key={"member-" + props.member.pk}
        id={"team-member-" + props.member.pk}
        data-username={props.member.fields.username}
        onClick={props.openMemberForm}
      >
        <span className="username">{props.member.fields.username}</span>
        <br />
        {props.member.fields.email}
      </div>
    );
  }
}

export default MemberCard;
