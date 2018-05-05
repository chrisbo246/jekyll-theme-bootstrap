# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-bootstrap"
  spec.version       = "2.5.0"
  spec.authors       = ["Joel Glovier"]
  spec.email         = ["jglovier@github.com"]

  spec.summary       = "A beautiful, jekyll-theme-bootstrapl theme for Jekyll."
  spec.homepage      = "https://github.com/jekyll/jekyll-theme-bootstrap"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.add_runtime_dependency "jekyll", "~> 3.5"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
  spec.add_development_dependency "bundler", "~> 1.15"
end
