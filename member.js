function skillsMember() {
  const member = {
    name: "John",
    age: 30,
    skills: ["HTML", "CSS", "JS"],
  };

  // Accessing object properties
  console.log(`Name: ${member.name}`);
  console.log(`Age: ${member.age}`);
  console.log(`Skills: ${member.skills.join(", ")}`);
}