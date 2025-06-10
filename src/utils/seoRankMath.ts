export const replaceSeoRM = (input?: string) => {
  if (!input) return "";

  return input
    .replace(
      `link rel="canonical" href="http://10.10.51.16:8002`,
      `link rel="canonical" href="http://10.10.51.16:3002`
    )
    .replace(
      `meta property="og:url" content="http://10.10.51.16:8002`,
      `meta property="og:url" content="http://10.10.51.16:3002`
    )
    .replace(
      `"@id":"http://10.10.51.16:8002/#organization"`,
      `"@id":"http://10.10.51.16:3002/#organization"`
    )
    .replace(
      `http://10.10.51.16:8002/#logo`,
      `http://10.10.51.16:3002/#logo`
    )
    .replace(
      `http://10.10.51.16:8002/#website`,
      `http://10.10.51.16:3002/#website`
    )
    .replace(
      `http://10.10.51.16:8002/#webpage`,
      `http://10.10.51.16:3002/#webpage`
    )
    .replace(
      `"url":"http://10.10.51.16:8002"`,
      `"url":"http://10.10.51.16:3002"`
    )
    .replace(
      `"@type":"WebPage","@id":"http://10.10.51.16:8002`,
      `"@type":"WebPage","@id":"http://10.10.51.16:3002`
    )
    .replace(
      `#webpage","url":"http://10.10.51.16:8002`,
      `#webpage","url":"http://10.10.51.16:3002`
    )
    .replace(
      `"mainEntityOfPage":{"@id":"http://10.10.51.16:8002`,
      `"mainEntityOfPage":{"@id":"http://10.10.51.16:3002/`
    )
    .replace(
      `"worksFor":{"@id":"http://10.10.51.16:8002/#organization`,
      `"worksFor":{"@id":"http://10.10.51.16:3002/#organization`
    )
    .replace(
      `"sameAs":["http://10.10.51.16:8002"]`,
      `"sameAs":["http://10.10.51.16:3002"]`
    );
};
