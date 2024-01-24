function MemberCard(props) {
  let memberClass = "team-member";

  if (props.user_type === "Manager") {
    memberClass += " manager";
  } else if (props.user_type === "Employee") {
    memberClass += " employee";
  } else {
    return
  }

  return (
    <div
      className={memberClass}
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

export default MemberCard;
