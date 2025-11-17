resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "6.7.18"

  namespace        = "argocd"
  create_namespace = true

  values = [yamlencode({
    server = {
      service = {
        # Keep ClusterIP to avoid public exposure assumptions.
        type = "ClusterIP"
      }
    }
  })]

  timeout = 600

  depends_on = [module.eks]
}


