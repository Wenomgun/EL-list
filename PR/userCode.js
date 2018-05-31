/*Пользовательский файл, где есть данные contactsData и mailData
* здесь пользоватеь создает наш элемент
* */

var contactsData = [
    {"name":"Илья", "surname":"Кузьмин", "birthday":new Date("5.29.1992")},
    {"name":"Иван", "surname":"Кузнецов", "birthday":new Date("4.29.1992")},
    {"name":"Сергей", "surname":"Калинцев", "birthday":new Date("3.29.1992")},
    {"name":"Коля", "surname":"Аизов", "birthday":new Date("4.29.1992")},
    {"name":"Иван", "surname":"Аитов", "birthday":new Date("3.29.1992")},
    {"name":"Петя", "surname":"Баранов", "birthday":new Date("3.29.1992")},
    {"name":"Иван", "surname":"Бустов", "birthday":new Date("4.29.1992")},
    {"name":"Араб", "surname":"Винилов", "birthday":new Date("5.29.1992")},
    {"name":"Иван", "surname":"Новиков", "birthday":new Date("4.19.1992")},
    {"name":"Иван", "surname":"Смирнов", "birthday":new Date("4.19.1992")},
    {"name":"Иван", "surname":"Страхов", "birthday":new Date("4.19.1992")},
    {"name":"ILYA", "surname":"KUZMIN", "birthday":new Date("5.29.1992")},
    {"name":"ILYA", "surname":"KAGAL", "birthday":new Date("5.29.1992")},
    {"name":"DGO", "surname":"MUNUP", "birthday":new Date("5.29.1992")},
    {"name":"SERG", "surname":"MISTAR", "birthday":new Date("5.29.1992")}
];

var mailData = [
    {"from":"Кузнецов", "to":"Кузьмин",  "sendDate":new Date("5.29.2000"), "theme":"Отчет"},
    {"from":"Кузнецов", "to":"Калинцев", "sendDate":new Date("4.29.2001"), "theme":"Отчет"},
    {"from":"Аизов", "to":"Калинцев", "sendDate":new Date("3.15.2002"), "theme":"Отчет"},
    {"from":"Калинцев", "to":"Аизов", "sendDate":new Date("3.15.2002"), "theme":"Отчет"},
    {"from":"Калинцев", "to":"Аитов", "sendDate":new Date("3.15.2002"), "theme":"Уведомление"},
    {"from":"Новиков", "to":"Баранов", "sendDate":new Date("4.29.2001"), "theme":"Уведомление"},
    {"from":"Баранов", "to":"Бустов", "sendDate":new Date("4.29.2001"), "theme":"Уведомление"},
    {"from":"Баранов", "to":"Винилов", "sendDate":new Date("4.29.2001"), "theme":"Уведомление"},
    {"from":"Смирнов", "to":"Новиков", "sendDate":new Date("4.19.1992"), "theme":"Сообщение"},
    {"from":"Новиков", "to":"Смирнов", "sendDate":new Date("5.29.2000"), "theme":"Сообщение2"},
    {"from":"Смирнов", "to":"Страхов", "sendDate":new Date("4.19.1992"), "theme":"Сообщение"},
    {"from":"Страхов", "to":"Винилов", "sendDate":new Date("5.29.1992"), "theme":"Сообщение"},
    {"from":"Страхов", "to":"Винилов", "sendDate":new Date("5.29.1992"), "theme":"Сообщение"},
    {"from":"Аитов", "to":"Смирнов", "sendDate":new Date("7.08.2005"), "theme":"Сообщение2"},
    {"from":"Баранов", "to":"Аитов", "sendDate":new Date("7.08.2005"), "theme":"Сообщение"}
];

createElementList("#divParent1", "el_my_box", contactsData, ["name"], 200, 500, "surname");
createElementList("#divParent2", "el_my_box_2", mailData, ["to", "theme"], 300, 300, "sendDate");
