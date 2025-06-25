export const replaceSeoRM = (input?: string) => {
  if (!input) return "";

  return input
    .replace(
      `link rel="canonical" href="https://adminsuckhoe.ome.edu.vn`,
      `link rel="canonical" href="https://ome.edu.vn/suc-khoe`
    )
    .replace(
      `meta property="og:url" content="https://adminsuckhoe.ome.edu.vn`,
      `meta property="og:url" content="https://ome.edu.vn/suc-khoe`
    )
    .replace(
      `"@id":"https://adminsuckhoe.ome.edu.vn/#organization"`,
      `"@id":"https://ome.edu.vn/suc-khoe/#organization"`
    )
    .replace(
      `https://adminsuckhoe.ome.edu.vn/#logo`,
      `https://ome.edu.vn/suc-khoe/#logo`
    )
    .replace(
      `https://adminsuckhoe.ome.edu.vn/#website`,
      `https://ome.edu.vn/suc-khoe/#website`
    )
    .replace(
      `https://adminsuckhoe.ome.edu.vn/#webpage`,
      `https://ome.edu.vn/suc-khoe/#webpage`
    )
    .replace(
      `"url":"https://adminsuckhoe.ome.edu.vn"`,
      `"url":"https://ome.edu.vn/suc-khoe"`
    )
    .replace(
      `"@type":"WebPage","@id":"https://adminsuckhoe.ome.edu.vn`,
      `"@type":"WebPage","@id":"https://ome.edu.vn/suc-khoe`
    )
    .replace(
      `#webpage","url":"https://adminsuckhoe.ome.edu.vn`,
      `#webpage","url":"https://ome.edu.vn/suc-khoe`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"https://adminsuckhoe.ome.edu.vn`,
      `"mainEntityOfPage":{"@id":"https://ome.edu.vn/suc-khoe/`
    )
    .replace(
      `"worksFor":{"@id":"https://adminsuckhoe.ome.edu.vn/#organization`,
      `"worksFor":{"@id":"https://ome.edu.vn/suc-khoe/#organization`
    )
    .replace(
      `"sameAs":["https://adminsuckhoe.ome.edu.vn"]`,
      `"sameAs":["https://ome.edu.vn/suc-khoe"]`
    );
};
