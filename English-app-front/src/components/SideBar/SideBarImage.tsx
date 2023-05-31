import React, {useState} from "react";
import {Image, Text} from "@mantine/core";
import {getRegistrationRole, RegistrationRole} from "../../common/Auth/LocalStorageService";


const SideBarImage = () => {

    const role: RegistrationRole = getRegistrationRole()

    return (
        <>
            {role === RegistrationRole.Student &&
            <Image
                radius="xl"
                height={"7rem"}
                fit="contain"
                src="https://thumb.ac-illust.com/f1/f1765886b4f85692cdddce7b9b2141be_t.jpeg"
                alt="Role"
                caption={<Text fw={700}>Student</Text>}/>
            }
            {role === RegistrationRole.Parent &&
            <Image
                radius="xl"
                height={"7rem"}
                fit="contain"
                src="https://img.freepik.com/free-vector/angry-father-screaming-crying-son-flat-vector-illustration-dad-punishing-sad-kid-breaking-rules-bad-behavior-parent-having-conflict-with-child-abuse-relationship-concept_74855-23941.jpg?w=2000"
                alt="Role"
                caption={<Text fw={700}>Parent</Text>}/>
            }
            {role === RegistrationRole.Teacher &&
            <Image
                radius="xl"
                height={"7rem"}
                fit="contain"
                src="https://img.freepik.com/free-vector/students-classroom-flat-vector-illustration_74855-6663.jpg?w=2000"
                alt="Role"
                caption={<Text fw={700}>Teacher</Text>}/>
            }
        </>
    )
};

export default SideBarImage;
